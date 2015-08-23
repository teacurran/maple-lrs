

module.exports.getLanguageMap = function(inContent) {
	var languageMap = [];

	for (var property in inContent) {
		if (inContent.hasOwnProperty(property)) {
			languageMap[languageMap.length] = {
				language: property,
				value: inContent[property]
			}
		}
	}

	return languageMap;
};

