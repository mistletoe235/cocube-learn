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
	projectText = (readFile (join activityDir '/files/CoCubeMazeMirror.ubp'))
	start = (findSubstring 'script 650 209 {' projectText)
	stop = (findSubstring (join (newline) 'module ') projectText start)
	main = (substring projectText start (stop - 1))
	code = (join 'GP Scripts' (newline) 'depends ' '''' 'CoCube' '''' (newline) (newline) main)
	for locale (array 'en' 'cn') {
		fixPNGScriptImage editor (join activityDir '/locales/' locale '/files/scriptImagePosition.png') code locale
	}
	setLanguage editor 'en'
	exit
}

method installLibraryNamed MicroBlocksScripter libName {
	if (notNil (libraryNamed mbProject libName)) { return }
	fileName = (findLibraryFileForMaze libName '../Libraries')
	if (isNil fileName) { return }
	importLibraryFromFile this fileName nil false
}

to findLibraryFileForMaze libName folder {
	target = (join libName '.ubl')
	direct = (join folder '/' target)
	if (notNil (readFile direct)) { return direct }
	for dirName (listDirectories folder) {
		result = (findLibraryFileForMaze libName (join folder '/' (filePart dirName)))
		if (notNil result) { return result }
	}
	return nil
}
