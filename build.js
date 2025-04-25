var fs = require('fs'),
    fse = require('fs-extra'),
    sass = require('sass'),
    handlebars = require('handlebars'),
    http = require('http'),
    WebSocket = require('ws'),
    autoprefixer = require('autoprefixer'),
    postcss = require('postcss'),
    markdown = new (require('showdown')).Converter(),
    args = process.argv.slice(2),
    debugMode = args.includes('--debug'),
    locales = { },
    languages =
        JSON.parse(
            fs.readFileSync(
                `${__dirname}/locales/languages.json`,
                'utf8'
            )
        );
    sitemapUrls = [],
    unwantedPages = [
        // relative to dist folder
        'activity.html',
        'teachers-guide.html',
        'activity-card.html'
    ],
    scriptPNGs = [],
    activityBeingBuilt = undefined;

// MarkDown additions

markdown.setOption('strikethrough', true);
markdown.setOption('tables', true);

markdown.addExtension({
    type: 'output',
    filter: function (html) {
        return html.replaceAll(
            /<p>(<img.*)title="(.*)" \/><\/p>/g,
            '<figure class="captioned">$1\/>' +
                '<figcaption class="caption">$2</figcaption></figure>'
        ).replaceAll(
            /<p>\[\[(.+?)\]\]/g, `<div class="$1">`
        ).replaceAll(
            /\[\[\/.*\]\]<\/p>/g, `</div>`
        ).replaceAll(
            /\<p>\<img src="(.*?)"/g, markScriptParagraphs
        ).replaceAll(
            /\<img src="(.*?)"/g, setImageAttributes
        );
    }
});

function markScriptParagraphs(match, pngName) {
    // If a paragraph starts with a script image, set the paragraph's class to "script".

    return scriptPNGs[activityBeingBuilt].includes(pngName) ?
        '<p class="script"> <img src="' + pngName + '"' :
        '<p><img src="' + pngName + '"';
}

function setImageAttributes(match, pngName) {
    // Set all images to load lazily. Add an onload handler to script images.

    return scriptPNGs[activityBeingBuilt].includes(pngName) ?
        '<img src="' + pngName + '" loading="lazy" onload="setScriptImageScale(this, 0.35)" class="scriptImg"' :
        '<img src="' + pngName + '" loading="lazy"';
}

// Handlebars additions

handlebars.registerHelper('markdown', (context, options) => {
    var md = options ?
            (options.data.root.markdown || options.fn(this)) :
            context.fn(this),
        html;
    try {
        html = markdown.makeHtml(md);
    } catch (err) {
        html = `<p>PARSING MARKDOWN FAILED:</p><pre>${err}</pre><br>` +
            `<pre>${md}</pre><br>`;
    }
    return html;
});

handlebars.registerHelper('join', function () {
    return Array.prototype.slice.call(arguments, 0, -1).join('');
});

handlebars.registerHelper('localize', function () {
    var data = arguments[arguments.length - 1].data.root,
        templateName = data['template-name'],
        locale = data.locale,
        key = arguments[0],
        params = [].slice.call(arguments, 1, -1),
        localized = locale[key];

    if (!localized) {
        // missing locale string, return EN one
        localized = locales.en.pages[templateName][key] ||
            locales.en.pages.global[key];
    }

    params.forEach((param, index) => {
        localized = localized.replace(`@${index + 1}`, param);
    });

    return localized;
});

handlebars.registerHelper('language-name', function (context) {
    return languages[context];
});

handlebars.registerHelper('json', function (context) {
    return JSON.stringify(context);
});

handlebars.registerHelper('lan_json_key', function (context, key) {
    return context[key] || context['en'];
});

// Thanks to kevlened at StackOverflow for the following boolean helpers
// https://stackoverflow.com/a/31632215

handlebars.registerHelper('and', function () {
    return Array.prototype.ever.call(arguments, Boolean);
});

handlebars.registerHelper('or', function () {
    return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
});

handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

handlebars.registerHelper('eq', function(a, b, options) {
    return a == b;
});


// Useful functions

function debug () { if (debugMode) { console.info(...arguments); } };

function doForFilesInDir (dir, extension, action, recursive) {
    // does something for each file of a particular extension in a directory
    var path = dir.startsWith('/') ? dir : `${__dirname}/${dir}`;
    if (fs.existsSync(path) && fs.statSync(path).isDirectory()) {
        var filenames = fs.readdirSync(path);
        filenames.forEach((fileName) => {
            var fullPath = path + '/' + fileName;
            if (fs.statSync(fullPath).isFile()) {
                var matches = extension ?
                    new RegExp(`^([^.]+).${extension}$`).exec(fileName) :
                    [fileName];
                if (!matches) { return; }
                var fileContents = fs.readFileSync(fullPath, 'utf8');
                action.call(
                    this,
                    fileName.replace(/\..*$/,'','g'), // strip file extension
                    fileContents,
                    fullPath,
                    fileName.replace(/.*\./,'','g') // file extension
                );
            } else if (recursive && fs.statSync(fullPath).isDirectory()) {
                // recurse into directory
                doForFilesInDir(
                    dir + '/' + fileName,
                    extension,
                    action,
                    recursive
                );
            } else if (extension == '/' &&
                fs.statSync(fullPath).isDirectory()
            ) {
                // iterate over directories
                action.call(this, fileName, fullPath);
            }
        });
    }
};

function slugForPath(activityPath, langCode) {
	var pathParts = activityPath.split('/');
	return pathParts[pathParts.length - 4] + '-' + langCode;
}

// Handlebars processing

function registerPartials (dir) {
    // registers handlebars partials in a particular templates/partials subdir
    doForFilesInDir(
        `src/templates/partials/${dir || ''}`,
        'hbs',
        (fileName, fileContents) => {
            // if there's a dir, register the partial as dir.name
            // i.e. svg.icon-plus.svg
            handlebars.registerPartial(
                (dir ? dir + '.' : '') + fileName,
                fileContents
            );
            debug(`registered partial: ${fileName}`);
        }
    );
};

function compileTemplates () {
    // compiles all templates
    doForFilesInDir(
        'src/templates',
        'hbs',
        (fileName, fileContents) => {
            var descriptorPath = `${__dirname}/data/pages/${fileName}.json`,
                descriptor = fs.existsSync(descriptorPath) ?
                    JSON.parse(fs.readFileSync(descriptorPath), 'utf8') : {};
            Object.keys(locales).forEach(
                (langCode) => {
                    compileTemplate(fileName, descriptor, langCode);
                }
            );
        }
    );
};

function compileTemplate (templateName, descriptor, langCode, destinationDir) {
    var template =
            fs.readFileSync(
                `${__dirname}/src/templates/${templateName}.hbs`,
                'utf8'
            ),
        destinationDir = destinationDir || '';

    // make the locale list available to all pages
    descriptor.locales = Object.keys(locales);
    descriptor.languages = languages;

    // store the template name in the descriptor, to be used by "localize"
    descriptor['template-name'] = templateName;

    if (debugMode) { descriptor.livereload = true; }

    // find locale data for this template
    descriptor.locale = locales[langCode].pages[templateName];
    if (!descriptor.locale) {
        debug(`missing locale: ${langCode} (default to EN)`);
        descriptor.locale = {};
        Object.assign(descriptor.locale, locales.en.pages[templateName]);
    }

    // add global strings to all page locales
    Object.keys(locales.en.pages.global).forEach((key) => {
        if (locales[langCode].pages.global &&
                locales[langCode].pages.global[key]) {
            descriptor.locale[key] = locales[langCode].pages.global[key];
        } else {
            descriptor.locale[key] = locales.en.pages.global[key];
        }
    });

    // add local strings to pages ? - Bernat, correct?
    descriptor.locale.code = langCode;

    // collect URLs for sitemap and pass it to the template
    descriptor.pageUrl = `https://learn.microblocks.fun/${langCode}/`
        + (destinationDir ? `${destinationDir}/` : ``)
        + `${descriptor.href || descriptor.slug || templateName}.html`;
    // debug(`url: ${descriptor.pageUrl}`);
    sitemapUrls.push(descriptor.pageUrl);

    // compile the template
    fse.ensureDirSync(`${__dirname}/dist/${langCode}/${destinationDir}`);
    fs.writeFileSync(
        `dist/${langCode}/${destinationDir}/` +
            `${descriptor.href || descriptor.slug || templateName}.html`,
        handlebars.compile(template)(descriptor)
    );
    debug(`compiled template: ${templateName}` +
        `${descriptor.slug ? (' ' + descriptor.slug) : ''} (${langCode})`);
};

// Build script functions

function build () {
    // builds the whole thing
    console.time("Building site in");

    // remove and remake dist directory
    fse.removeSync(`${__dirname}/dist`);
    fse.ensureDirSync(`${__dirname}/dist`);

    // register all handlebars partials
    registerPartials('svg');
    registerPartials('layouts');
    registerPartials();

    // concat all JS
    concatJS();

    // compile sass stylesheets, autoprefixing the resulting CSS
    compileSass();

    // copy assets and JSON files
    copyAssets();

    // process localization files
    processLocales();

    // process all activity descriptors and build pages for each of them
    buildActivities();

    // compile all templates
    compileTemplates();

    if (!debugMode) {
        // build sitemap
        buildSitemap();
        // delete unwanted html files generated
        deleteUnwantedPages();
    }

    console.timeEnd("Building site in");
};

function processLocales () {
    doForFilesInDir(
        'locales',
        '/',
        (dirName, fullPath) => {
            locales[dirName] = { pages: {} };
            doForFilesInDir(
                `locales/${dirName}`,
                'json',
                (fileName, fileContents) => {
                    locales[dirName].pages[fileName] =
                    JSON.parse(fileContents);
                },
                true // recursive
            )
            debug(`processed locale: ${dirName}`);
        }
    );
};

function buildActivities () {
    var activityDescriptors = [];
    doForFilesInDir(
        'data/activities',
        '/',
        (activityDir, activityPath) => {
            buildAllActivityPages(
                activityDir,
                activityPath,
                activityDescriptors
            );
        }
    );
    fs.writeFileSync(
        'dist/activities.json',
        JSON.stringify(activityDescriptors)
    );
};

function buildAllActivityPages (activityDir, activityPath, activityDescriptors) {
    // new activity
    var meta = JSON.parse(
            fs.readFileSync(
                `${activityPath}/meta.json`, 'utf8'
            )
        );

    // get the slugs for each locale
    // unfortunately we need to do two passes over the directory
    meta.translations = [];
    meta.contents = {
        basic:{
            cocube_basic_00_start: {
                cn: "00 新手指引",
                en: "00 Getting Started"
            },
            cocube_basic_01_lcd: {
                cn: "01 LCD 屏幕编程",
                en: "01 LCD Screen Programming"
            },
            cocube_basic_02_motion: {
                cn: "02 运动基础",
                en: "02 Motion Basics"
            },
            cocube_basic_03_comap: {
                cn: "03 定位垫的使用",
                en: "03 Using the CoMap"
            },
            cocube_basic_04_music: {
                cn: "04 音乐编程",
                en: "04 Music Programming"
            },
            cocube_basic_05_gripper: {
                cn: "05 夹爪外接模块",
                en: "05 Gripper External Module"
            },
            cocube_basic_06_broadcast: {
                cn: "06 广播事件",
                en: "06 Broadcast Event"
            },
            cocube_basic_07_keyboard: {
                cn: "07 键盘事件",
                en: "07 Keyboard Event"
            },
            cocube_basic_08_wechat: {
                cn: "08 微信小程序控制",
                en: "08 WeChat Mini Program Control"
            },

        },
        external:{
            cocube_external_01_neopixel: {
                cn: "01 NeoPixel 全彩灯板模块",
                en: "01 NeoPixel RGB LED Module"
            },
            cocube_external_02_tof: {
                cn: "02 ToF 激光测距模块",
                en: "02 ToF Laser Ranging Module"
            },
            cocube_external_03_gesture: {
                cn: "03 3D 手势传感器模块",
                en: "03 3D Gesture Sensor Module"
            }
        },
        advanced:{
            cocube_advanced_01_colordetect: {
                cn: "01 色块识别",
                en: "01 Color Detection"
            },
            cocube_advanced_02_traffic: {
                cn: "02 智慧交通",
                en: "02 Smart Traffic"
            },
            cocube_advanced_03_line: {
                cn: "03 线条检测",
                en: "03 Line Detection"
            },
            cocube_advanced_04_apriltag: {
                cn: "04 AprilTag 识别",
                en: "04 AprilTag Detection"
            }
        }



    }
    doForFilesInDir(
        `data/activities/${activityDir}/locales/`,
        '/',
        (langCode, localePath) => {
            var json = JSON.parse(
                    fs.readFileSync(
                        `${localePath}/meta.json`,
                        'utf8'
                    )
                ),
                slug = slugForPath(localePath, langCode);

            meta.translations.push({
                langCode: langCode,
                slug: slug,
                title: json.title || meta.title
            });
        }
    );
    // process locales, under subdirs
    doForFilesInDir(
        `data/activities/${activityDir}/locales/`,
        '/',
        (langCode, localePath) => {
            // activities stores the list of all activity descriptors
            var localeDescriptor = JSON.parse(
                    fs.readFileSync(
                        `${localePath}/meta.json`,
                        'utf8'
                    )
                ),
                descriptor = {};
            localeDescriptor.title =
                localeDescriptor.title || meta.title;
            localeDescriptor.author =
                localeDescriptor.author || meta.author;
            localeDescriptor.level =
                localeDescriptor.level || meta.level || 1;
            localeDescriptor.translations = meta.translations.filter(
                (each) => { return each.langCode !== langCode });
            localeDescriptor.contents = meta.contents;
            localeDescriptor.components = meta.components || [];
            localeDescriptor.topics = meta.topics || [];
            localeDescriptor.time = meta.time || [30, 45];
            localeDescriptor.boards = meta.boards || [];
            localeDescriptor.slug = slugForPath(localePath, langCode);
            localeDescriptor.locale = langCode;
            localeDescriptor.href = 'index';
            localeDescriptor['has-card'] =
                fs.existsSync(
                    `${localePath}/files/activity-card.pdf`) ||
                fs.existsSync(
                    `${activityPath}/files/activity-card.pdf`) ||
                meta['card-url'];
            localeDescriptor['card-url'] =
                localeDescriptor['card-url'] ||
                meta['card-url'] ||
                './activity-card.pdf';
            localeDescriptor['card-slides-url'] =
                localeDescriptor['card-slides-url'] ||
                meta['card-slides-url'];
            localeDescriptor['has-project'] =
                fs.existsSync(
                    `${localePath}/files/project.ubp`) ||
                fs.existsSync(
                    `${activityPath}/files/project.ubp`);
            localeDescriptor['has-guide'] =
                fs.existsSync(`${localePath}/teachers-guide.md`);
            localeDescriptor['has-video'] =
                ( localeDescriptor['video-url'] || meta['video-url'] ) ? true : false;
            localeDescriptor['video-url'] =
                localeDescriptor['video-url'] ||
                meta['video-url'] ||
                [];

            Object.assign(descriptor, meta);
            // overwrite top-level meta fields with their values in the
            // locale descriptor
            Object.keys(localeDescriptor).forEach((key) => {
                descriptor[key] = localeDescriptor[key];
            });

            if (!descriptor.draft) {
                activityDescriptors.push(descriptor);
            }

            debug(`processed activity: ${activityDir} (${langCode})`);

            collectActivityAssets(localeDescriptor, langCode, activityPath);
            buildActivity(localeDescriptor, langCode, activityPath);
        }
    );

};

function collectActivityAssets (descriptor, langCode, activityPath) {
    // Create a folder containing the assets of each translation of the given ativity.

	var assetsDir = `${__dirname}/dist/activity-assets/${descriptor.slug}/`;
    Object.keys(locales).forEach(
        (localeCode) => {
            // copy image files from both the activity root and locale
            if (fs.existsSync(`${activityPath}/files/`)) {
                fse.copySync(`${activityPath}/files/`,assetsDir);
            }
            if (fs.existsSync(`${activityPath}/locales/${langCode}/files/`)) {
                fse.copySync(`${activityPath}/locales/${langCode}/files/`, assetsDir);
            }
        }
    );

    // collect PNG's containing scripts
    var pngsWithScripts = [];
    var assetFiles = fs.readdirSync(assetsDir);
    assetFiles.forEach((fileName) => {
        if (pngHasScript(assetsDir + fileName)) {
            pngsWithScripts.push(fileName);
            console.log('pngHasScript', assetsDir+fileName);
        }
    });
    scriptPNGs[descriptor.slug] = pngsWithScripts;
};

function pngHasScript(filePath) {
	// Return true if the given PNG file includes a script.

    if (!filePath.endsWith('.png')) return 0;

    // read the PNG file
    var data;
    try {
        data = fs.readFileSync(filePath);
    } catch(err) {
        console.error(err);
        return 0;
    }

    // search PNG data for the string 'GP Script'
    return (indexOfStringInData('GP Script', data) >= 0);
}

function indexOfStringInData(aString, data) {
    // Return the index of the given string in the given byte array or -1 if not found.

    var tag = new TextEncoder('utf-8').encode(aString);
    for (var i = 0; i >= 0; i = data.indexOf(tag[0], i + 1)) {
        var match = true;
        for (var j = 0; j < tag.length; j++) {
            if (data[i + j] != tag[j]) {
                match = false;
                break;
            }
        }
        if (match) return i;
    }
    return -1;
}

function linkActivityAssets(activityDir, assetsDir) {
	// Add links in activityDir to each file in assetsDir.

    var assetFiles = fs.readdirSync(assetsDir);
    assetFiles.forEach(
        (assetPath) => {
            fName = assetPath.split('/').pop();
            if (fName[0] != '.') { // skip .DS_Store on MacOS
                fse.copySync(
                	`${assetsDir}/${fName}`,
                	`${activityDir}/${fName}`
                );
            }
        }
    );
};

function buildActivity (descriptor, langCode, activityPath) {
    // we need to build the activity page for all available page locales, even
    // though the activity may not be available in all of these languages
    // TODO refactor this humongous thing

    activityBeingBuilt = descriptor.slug;
    Object.keys(locales).forEach(
        (localeCode) => {
            descriptor.markdown =
                fs.readFileSync(
                    `${activityPath}/locales/${langCode}/index.md`,
                    'utf8'
                );
            compileTemplate(
                'activity',
                descriptor,
                localeCode,
                `activities/${descriptor.slug}`
            );

            // add links to shared activity assets
            linkActivityAssets(
                `${__dirname}/dist/${localeCode}/activities/${descriptor.slug}`,
                `${__dirname}/dist/activity-assets/${descriptor.slug}`);

            if (descriptor['has-guide']) {
                var guideDescriptor = {
                    markdown:
                        fs.readFileSync(
                            `${activityPath}/locales/${langCode}/` +
                                `teachers-guide.md`,
                            'utf8'
                        ),
                    title: descriptor.title,
                    href: 'index',
                    slug: descriptor.slug,
                    time: descriptor.time,
                    level: descriptor.level,
                    topics: descriptor.topics
                };
                compileTemplate(
                    'teachers-guide',
                    guideDescriptor,
                    localeCode,
                    `activities/${descriptor.slug}/guide`
                );
            }
        }
    );
};

function copyAssets () {
    fse.copySync(
        `${__dirname}/src/assets`,
        `${__dirname}/dist/assets`,
        { overwrite: true },
        (err) => { if (err) { console.error(err); } }
    );
    fse.copySync(
        `${__dirname}/data/json/`,
        `${__dirname}/dist/`,
        { overwrite: true },
        (err) => { if (err) { console.error(err); } }
    );
    fse.copySync(
        `${__dirname}/authorization`,
        `${__dirname}/dist/`,
        { overwrite: true },
        (err) => { if (err) { console.error(err); } }
    );
};

function concatJS () {
    var fullJS = '';
    doForFilesInDir(
        'src/scripts',
        'js',
        (fileName, fileContents) => {
            fullJS += fileContents;
        }
    );
    fs.writeFileSync(`${__dirname}/dist/main.js`, fullJS);
};

function compileSass () {
    // Compile SASS files and autoprefix the resulting CSS
    sass.render(
        {
            file: `${__dirname}/src/styles/main.scss`,
            outputStyle: (debugMode ? 'expanded' : 'compressed')
        },
        (err, result) => {
            if (err) {
                console.error(err);
            } else {
                postcss([ autoprefixer ])
                    .process(result.css, { from: undefined })
                    .then(prefixed => {
                        prefixed.warnings().forEach(warn => {
                            console.warn(warn.toString())
                        });
                        fs.writeFileSync(
                            `${__dirname}/dist/main.css`,
                            prefixed.css
                        );
                    });
                }
            }
            );
        };

function buildSitemap () {
    // building a sitemap with all the URLs and referencing it with robots.txt
    let sitemapContents = 'https://learn.microblocks.fun/\n'; // initial
    let robotsContents = 'Sitemap: https://learn.microblocks.fun/sitemap.txt\n' // initial
    let unwantedURLs = [];

    // populate unwantedURLs
    unwantedPages.forEach( name => {
        Object.entries(languages).forEach(([key, value]) => {
            unwantedURLs.push(`https://learn.microblocks.fun/${key}/${name}`);
        });
    });

    // add all URLs generated by compileTemplate()
    // that aren't listed in unwantedURLs
    sitemapUrls.forEach( url => {
        if ( !unwantedURLs.includes(url) ) {
            sitemapContents += url + '\n';
        }
    })

    try {
        fs.writeFileSync('dist/sitemap.txt', sitemapContents);
        fs.writeFileSync('dist/robots.txt', robotsContents);
        debug(`Sitemap generated: ${sitemapUrls.length} URLs`);
    } catch(err) {
        console.error(err);
    }
};

function deleteUnwantedPages () {
    // delete unwanted pages generated by the build process,
    // because it's easier than to avoid creating them
    unwantedPages.forEach( name => {
        Object.entries(languages).forEach(([key, value]) => {
            let filePath = `dist/${key}/${name}`;
            fse.removeSync(filePath);
        });
    });
}

function serve () {
    // Dead simple (and naive) HTTP static server

    function respondWithFile (res, fileName, params) {
        // Do we need to do anything at all with params? I don't think so
        fs.readFile(
            pathTo(fileName),
            (err, data) => {
                res.setHeader('Content-Type', mimeTypeFor(fileName));
                if (err) {
                    res.writeHead(404);
                    err.fileName = fileName;
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
    };

    function mimeTypeFor (fileName) {
        var extension = fileName.replace(/.*\./,''),
            mimeType = {
                svg: 'image/svg+xml',
                png: 'image/png',
                jpg: 'image/jpg',
                jpeg: 'image/jpg',
                html: 'text/html',
                htm: 'text/html',
                css: 'text/css',
                ttf: 'font/ttf',
                otf: 'font/otf',
                woff: 'font/woff',
                pdf: 'application/pdf',
                zip: 'application/zip',
            }[extension];
        if (!mimeType) { mimeType = 'text/html'; }
        return mimeType;
    };

    function pathTo (fileName) {
        return `${__dirname}/dist/${fileName.replace(/\?.*/,'')}`;
    };

    function getParams (url) {
        url.replace(/.*\?/,'').split('&').map(
            paramString => {
                var pairArray = paramString.split('='),
                    assoc = {};
                assoc[pairArray[0]] = pairArray[1];
                return assoc;
            }
        );
    };

    http.createServer(function (req, res) {
        var fileName = req.url;
        if (req.url === '/') {
            fileName = 'index.html';
        }
        if (!fs.existsSync(pathTo(fileName))) {
            fileName = fileName + '.html';
        } else if (fs.lstatSync(pathTo(fileName)).isDirectory()) {
            if (!req.url.endsWith('/')) {
                // this is a directory, redirect to the same path but with a
                // trailing slash
                res.writeHead(301, { Location: req.url + '/'} );
                res.end();
                return;
            }
            fileName = fileName + '/index.html';
        }
        respondWithFile(res, fileName, getParams(req.url));
    }).listen(3000);
};

function watchDirs (dirs, action) {
    dirs.forEach(
        (dir) => {
            doForFilesInDir(
                dir,
                null, // all extensions
                (fileName, fileContents, fullPath, extension) => {
                    debug(`watching file: ${fullPath}`);
                    fs.watchFile(fullPath, { interval: 1000 }, (c, p) => {
                        action.call(this, fileName, extension, fullPath);
                    });
                },
                true // recursive
            );
        }
    );
};

function watch () {
    var wss = new WebSocket.Server({ port: 8080 }),
        clients = [];

    watchDirs(
        [
            'src/templates', 'src/styles', 'src/scripts',
            'data', 'locales'
        ],
        (fileName, extension, fullPath) => {
            debug(`File ${fullPath} changed.`);
            if (extension === 'scss') {
                debug('Rebuilding styles...');
                compileSass();
            } else if (fullPath.includes('/data/activities/')) {
                var match = fullPath.match(/.*\/data\/activities\/(.*?)\//),
                    path = match[0],
                    activity = match[1];
                debug(`Rebuilding activity ${activity}...`);
                buildAllActivityPages(activity, path, []);
            } else if (
                fullPath.includes('/data/json/') ||
                fullPath.includes('/src/assets/')
            ) {
                debug(`Updating assets...`);
                copyAssets();
            } else if (fullPath.includes('/src/scripts/')) {
                debug(`Updating scripts...`);
                concatJS();

            } else {
                debug(`Rebuilding full site. Please wait... (and sorry!)`);
                // silently build site
                debugMode = false;
                build(); 
                debugMode = true;
            }
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send('reload');
                }
            });
        }
    );

    wss.on('connection', client => {
        clients.push(client);
        client.send('LiveReload connected to server');
    });
};


// Build, watch, and serve

build();

if (debugMode) {
    watch();
    serve();
    console.log("\nHTTP Server: '127.0.0.1:3000/en'");
}
