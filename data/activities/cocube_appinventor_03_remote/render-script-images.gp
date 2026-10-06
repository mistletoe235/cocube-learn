to startup {
	activityDir = (last (commandLine))
	page = (newPage 1000 600)
	setDevMode page true
	setGlobal 'page' page
	setGlobal 'scale' 1
	setGlobal 'blockScale' 1
	open page true 'MicroBlocks'
	editor = (initialize (new 'MicroBlocksEditor') (emptyProject))
	setField editor 'newerVersion' nil
	setField editor 'versionCheckOnStartup' false
	addPart page editor
	developerModeChanged editor
	setBlockScalePercent editor 180
	setExportScale (scriptEditor (scripter editor)) 180
	projectText = (readFile (join activityDir '/files/CoCubeRemote.ubp'))
	main = (substring projectText (findSubstring 'script 40 40 {' projectText) ((findSubstring 'script 900 40 {' projectText) - 2))
	receiver = (substring projectText (findSubstring 'script 900 40 {' projectText) ((findSubstring 'script 900 350 {' projectText) - 2))
	dependencies = (join 'depends ' '''' 'CoCube' '''' ' ' '''' 'LED Display' '''')
	for locale (array 'en' 'cn') {
		code = (join 'GP Scripts' (newline) dependencies (newline) 'variables leftSpeed rightSpeed ticksSinceCommand' (newline) (newline) main)
		fixPNGScriptImage editor (join activityDir '/locales/' locale '/files/scriptImageRemoteSafety.png') code locale
		code = (join 'GP Scripts' (newline) dependencies (newline) 'variables leftSpeed rightSpeed ticksSinceCommand' (newline) (newline) receiver)
		fixPNGScriptImage editor (join activityDir '/locales/' locale '/files/scriptImageRemoteReceive.png') code locale
	}
	setLanguage editor 'en'
	exit
}

method installLibraryNamed MicroBlocksScripter libName {
	if (notNil (libraryNamed mbProject libName)) { return }
	fileName = (findLibraryFileForRemote libName '../Libraries')
	if (isNil fileName) { return }
	importLibraryFromFile this fileName nil false
}

to findLibraryFileForRemote libName folder {
	target = (join libName '.ubl')
	direct = (join folder '/' target)
	if (notNil (readFile direct)) { return direct }
	for dirName (listDirectories folder) {
		result = (findLibraryFileForRemote libName (join folder '/' (filePart dirName)))
		if (notNil result) { return result }
	}
	return nil
}
