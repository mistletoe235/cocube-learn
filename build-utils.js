const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function listFiles(dirPath) {
    const files = {};
    if (!fs.existsSync(dirPath)) {
        return files;
    }

    function walk(currentDir, prefix) {
        fs.readdirSync(currentDir).forEach((entry) => {
            if (entry[0] === '.') {
                return;
            }
            const fullPath = path.join(currentDir, entry);
            const relativePath = prefix ? `${prefix}/${entry}` : entry;
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                walk(fullPath, relativePath);
                return;
            }
            files[relativePath] = fullPath;
        });
    }

    walk(dirPath, '');
    return files;
}

function fileHash(filePath) {
    const hash = crypto.createHash('sha256');
    hash.update(fs.readFileSync(filePath));
    return hash.digest('hex');
}

function canShareLocalizedAsset(relativePath) {
    return path.extname(relativePath).toLowerCase() !== '.png';
}

function buildRelativeRootPath(destinationDir) {
    const depth = destinationDir.split('/').filter(Boolean).length + 1;
    return '../'.repeat(depth);
}

function rewriteAssetLinks(markdown, replacements) {
    let rewritten = markdown;

    Object.entries(replacements).forEach(([from, to]) => {
        const escaped = escapeRegExp(from);
        rewritten = rewritten
            .replace(
                new RegExp(`(\\]\\()${escaped}(?=[\\s)])`, 'g'),
                `$1${to}`
            )
            .replace(
                new RegExp(`((?:href|src)=["']?)${escaped}(?=[\\s\"'>])`, 'g'),
                `$1${to}`
            );
    });

    return rewritten;
}

function getSharedActivityAssetPlan(activityPath, slug) {
    const commonFiles = listFiles(path.join(activityPath, 'files'));
    const localizedFilesByLang = {};
    const localizedShared = {};
    const localizedUnique = {};
    const sharedGroups = {};

    const localesRoot = path.join(activityPath, 'locales');
    if (fs.existsSync(localesRoot)) {
        fs.readdirSync(localesRoot).forEach((langCode) => {
            const localizedFiles = listFiles(
                path.join(localesRoot, langCode, 'files')
            );
            localizedFilesByLang[langCode] = localizedFiles;
            localizedShared[langCode] = {};
            localizedUnique[langCode] = Object.assign({}, localizedFiles);
        });
    }

    const filesByRelativePath = {};
    Object.entries(localizedFilesByLang).forEach(([langCode, localizedFiles]) => {
        Object.entries(localizedFiles).forEach(([relativePath, fullPath]) => {
            filesByRelativePath[relativePath] =
                filesByRelativePath[relativePath] || [];
            filesByRelativePath[relativePath].push({ langCode, fullPath });
        });
    });

    Object.entries(filesByRelativePath).forEach(([relativePath, entries]) => {
        if (!canShareLocalizedAsset(relativePath)) {
            return;
        }

        const groupsByHash = {};
        entries.forEach(({ langCode, fullPath }) => {
            const hash = fileHash(fullPath);
            groupsByHash[hash] = groupsByHash[hash] || [];
            groupsByHash[hash].push({ langCode, fullPath });
        });

        Object.values(groupsByHash).forEach((matches) => {
            if (matches.length < 2) {
                return;
            }
            const outputPath = `activity-assets/${slug}/localized/${relativePath}`;
            sharedGroups[relativePath] = {
                outputPath,
                sourcePath: matches[0].fullPath
            };
            matches.forEach(({ langCode, fullPath }) => {
                localizedShared[langCode][relativePath] = {
                    outputPath,
                    sourcePath: fullPath
                };
                delete localizedUnique[langCode][relativePath];
            });
        });
    });

    const common = {};
    Object.entries(commonFiles).forEach(([relativePath, sourcePath]) => {
        common[relativePath] = {
            outputPath: `activity-assets/${slug}/common/${relativePath}`,
            sourcePath
        };
    });

    return {
        common,
        localizedShared,
        localizedUnique,
        sharedGroups
    };
}

module.exports = {
    buildRelativeRootPath,
    getSharedActivityAssetPlan,
    rewriteAssetLinks
};
