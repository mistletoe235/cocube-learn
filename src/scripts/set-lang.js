function setLang(langCode) {
    const newPath = location.pathname.substring(3).replace(/-[a-z]{2}/, `-${langCode}`); // 替换语言代码
    location.href = `${location.protocol}//${location.host}/${langCode}${newPath}`
}