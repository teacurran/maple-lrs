
module.exports.getLanguageMap = function(inContent) {
	var languageMap = [];

	for (var i=0; i < inContent.children.length; i++) {
		var child = inContent.children[i];
		languageMap[i] = {
			language: "test",
			value: "value"
		}
	}
	return languageMap;
};

