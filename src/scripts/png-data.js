function setScriptImageScale(img, scale) {
    // Set scale for the given script image when it is loaded.
    if (!(img.attributes.height || img.attributes.width)) {
        img.style.width = Math.round(scale * img.naturalWidth) + 'px';
    } else {
        img.style['vertical-align'] = 'middle';
        if (img.attributes.height) {
            img.style.height = img.attributes.height.value + 'px';
        }
        if (img.attributes.width) {
            img.style.width = img.attributes.width.value + 'px';
        }
    }
}

window.onbeforeprint = function() {
    // Set scale of script images for printing.
    var scriptImages = Array.from(document.getElementsByClassName('scriptImg'));
    for (const img of scriptImages) { setScriptImageScale(img, 0.22); }
}

window.onafterprint = function() {
    // Set scale of script images for viewing in browser.
    var scriptImages = Array.from(document.getElementsByClassName('scriptImg'));
    for (const img of scriptImages) { setScriptImageScale(img, 0.35); }
}
