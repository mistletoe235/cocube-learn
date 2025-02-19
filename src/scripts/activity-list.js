var activities = null,
    boards = null,
    currentPage = 1,
    totalPages = 1,
    pageSize = 12,
    filters = {};

// ==== FETCHING DATA ====

function fetchJSON (fileName, onsuccess) {
    // only request the JSON file the first time
    if (!window[fileName]) {
        var req = new XMLHttpRequest();
        req.open(
            'GET',
            `/${fileName}.json?random=${Math.floor(Math.random()*99999)}`,
            false
        );
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200 || req.status == 0) {
                    window[fileName] = JSON.parse(req.responseText);
                    if (onsuccess) { onsuccess.call(this); }
                }
            }
        };
        req.send(null);
    }
};

function fetchActivities () {
    fetchJSON('activities',
        () => {
            fetchJSON('boards');
            updateActivityList();
            populateFilters();
        }
    );
};

// ==== HTML COMPOSING ====

function updateActivityList () {
    var listDiv = document.querySelector('#activity-grid'),
        countDiv = document.querySelector('.v_home__activity-count'),
        filtered = filteredActivities();

    totalPages = Math.ceil(filtered.length / pageSize);
    listDiv.innerHTML = '';
    countDiv.innerHTML = filtered.length > 1 ?
        localize('result-count', filtered.length) :
        (filtered.length === 0 ?
            localize('result-count-zero') :
            localize('result-count-one')
        );
    filtered.splice((currentPage - 1) * pageSize, pageSize).forEach(
        (activity) => {
            listDiv.insertAdjacentHTML('beforeend', activityDiv(activity));
        }
    );
    updatePages();
};

function activityDiv (activity) {
    var title           = activity.title,
        link            = `activities/${activity.slug}`,
        thumb           = `activities/${activity.slug}/thumbnail.jpg`,
        boards          = '',
        components      = '';

    // create lists out of specs arrays
    function buildList (arrayOfSpecs) {
        let list = '';

        // if (arrayOfSpecs.length == 0) {
        //     list = 'None.'
        // }

        arrayOfSpecs.forEach( (element, index, array) => {
            list += localize(element);
            if (index < (array.length - 1) ){
                list += ', ';
            } else {
                list += '';
            }
        });

        return list;
    };

    boards = buildList(activity.boards);
    components = buildList(activity.components);

    var div = ``;

    return div;
};

function populateFilters () {
    // matches activity descriptor keys and <select> element class names to
    // populate the <select> elements with all possible values in the activity
    // descriptors

    var selectElements = Array.from(
            document.querySelector(
                '#activity-filters'
            ).querySelectorAll('.activity-filter')
        ),
        addOption = function (element, selector, text, meta) {
            if (!element.namedItem(selector)) {
                var option = new Option(text, selector);
                option.id = selector;
                if (meta) { option.dataset['meta'] = JSON.stringify(meta); }
                element.appendChild(option);
            }
        },
        atomText = function (selector, value) {
            if (selector === 'level') {
                return localize('lvl_' + value);
            } else if (selector === 'locale') {
                return languages[value];
            }
            return value;
        }

    activities.forEach((activity) => {
        Object.keys(activity).forEach((selector) => {
            selectElements.filter((element) => {
                return element.classList.contains(selector)
            }).forEach((element) => {
                var value = activity[selector];
                if (Array.isArray(value)) {
                    // i.e. boards: [ 'micro:bit', 'ed1' ]
                    value.forEach((value) => {
                        addOption(element, value, localize(value));
                    });
                } else {
                    // atom, i.e. 1, "en"
                    addOption(element, value, atomText(selector, value));
                }
            });
        });
    });

    // Set the language filter to the page locale, by default, and apply the
    // filter
    document.querySelector('select.locale.activity-filter').value =
        document.documentElement.lang;
    applyFilter('locale', document.documentElement.lang);
};

// ==== FILTERING ====

function applyFilter (selector, value) {
    filters[selector] = value;
    currentPage = 1; // always starts on page 1
    updateActivityList();
};

function resetFilters () {
    document.querySelectorAll('.activity-filter').forEach((select) => {
        select.value = '';
    });
    document.querySelectorAll('.activity-toggle').forEach((check) => {
        check.checked = false;
    });
    filters = {};
    updateActivityList();
};

function filteredActivities() {
    var filtered = [];

    // filter by boards
    if (filters.boards) {
        filtered = activities.filter(
            (activity) => {
                return activity.boards.includes(filters.boards);
            }
        );
    } else {
        Object.assign(filtered, activities);
    }

    // then, add compatible boards, if needed
    if (filters.boards && filters.compatible) {
        activities.forEach((activity) => {
            if (!filtered.includes(activity) &&
                boards[filters.boards].compatible.some(
                    (board) => {
                        return activity.boards.includes(board)
                    }
                )
            ) {
                filtered.push(activity);
            }
        });
    }

    // now filter by all the rest
    return filtered.filter((activity) => {
        return Object.keys(filters).every((selector) => {
            if (Array.isArray(activity[selector])) {
                // i.e. topics: [ 'art', 'music' ]
                return (filters[selector] === '') || (selector === 'boards') ||
                    activity[selector].includes(filters[selector]) ||
                    ((filters[selector] === 'none') &&
                        (activity[selector].length === 0));
            } else if (typeof filters[selector] === 'boolean') {
                // only "true" triggers filters in checkboxes
                return (selector === 'compatible') ||
                    (filters[selector] && activity[selector]) ||
                    !filters[selector]
            } else {
                // other atoms, i.e. 2
                return filters[selector] === '' ||
                    activity[selector] === filters[selector];
            }
        })
    });
};

// ==== PAGINATION ====

function nextPage () {
    if (currentPage < totalPages) {
        currentPage ++;
        updateActivityList();
    }
};

function previousPage () {
    if (currentPage > 1) {
        currentPage --;
        updateActivityList();
    }
};

function pageElementHtml (pageNum) {
    if (typeof pageNum === 'number') {
        return `<div class="c_pagination__item
            ${currentPage === pageNum ?  ' c_pagination__item--active' : ''}"
            onclick="currentPage = ${pageNum}; updateActivityList(); scrollToTop();"
            role="button" tabindex="0" aria-label="Go to page ${pageNum}"
            ${currentPage === pageNum ? ' aria-current="true"' : ''}>
            ${pageNum}</div>`;
    } else {
        // pageNum is either "<" or ">"
        var disabled = (currentPage === 1 && pageNum === '<') ||
            (totalPages === 0 || currentPage === totalPages && pageNum === '>');
        // Yep, tomorrow I'll have a hard time understanding this code.
        // Nope, sorry. I'm not documenting this. I'll just rewrite it from
        // scratch if need be.
        return `<div class="c_pagination__item
            ${disabled ? ' c_pagination__item--disabled' : ''}"
            onclick="${['previous','next'][['<','>'].indexOf(pageNum)]}Page(); scrollToTop();"
            role="button" tabindex="0" ${pageNum === '<' ?
                    ' aria-label="Previous Page"' : ' aria-label="Next Page"' }
            ${disabled ? ' aria-disabled="true"' : ''}
            >&${['lt','gt'][['<','>'].indexOf(pageNum)]};</div>`
    }
};

function scrollToTop () {
    var filtersDiv = document.querySelector('.v_home__filters'); // for scrolling to it
    var filtersYPos = filtersDiv.getBoundingClientRect().top;
    var scroollTo = filtersYPos + window.pageYOffset - 40;
    window.scrollTo({
        top: scroollTo,
        left: 0,
        behavior: 'smooth'
    })
}

function updatePages () {
    var html;
    if (totalPages < 2) {
        html = '';
    } else {
        html = pageElementHtml('<');
        for (var pageNum = 1; pageNum <= totalPages; pageNum ++) {
            html += pageElementHtml(pageNum);
        }
        html += pageElementHtml('>');
    }
    document.querySelector('.c_pagination').innerHTML = html;
};

function filtersResponsiveness() {
    const windowWidth = window.innerWidth;
    const activityFilters = document.querySelector('.c_filters');
    const activityFiltersToggle =
        document.querySelector('.v_home__filters-button');
    const activityFiltersClose =
        document.querySelector('.c_filters__mobile-close');

    if ( windowWidth < '768' ) {
        activityFilters.setAttribute('tabindex', '0');
    };

    activityFiltersToggle.addEventListener('click', () => {
        activityFilters.classList.add('c_filters--is-visible');
        activityFilters.setAttribute('tabindex', '1');
    });

    activityFiltersClose.addEventListener('click', () => {
        activityFilters.classList.remove('c_filters--is-visible');
        activityFilters.setAttribute('tabindex', '0');
    });
};


/**
 * TODO:
 * Robots.txt to sort out that JS content generation
 * won't provide search engines a readable structure
 */
