var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
	homePage: String,
	name: String
});

var activityStateSchema = new Schema({
	values : []
});

var activityProfileSchema = new Schema({
	values : []
});


var statementSchema = new Schema({
	statementId: String,
	actor: [{
		objectType: String,
		name: String,
		member: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Statement'
		}],
		mbox: String,
		mbox_sha1sum: String,
		openid: String,
		account: [accountSchema]
	}],
	verb: [verbSchema],
	timestamp: String
});

var verbSchema = new Schema({
	id: String,
	display: [{
		language: String,
		value: String
	}]
});

exports.Account = mongoose.model('Account', accountSchema);
exports.Verb = mongoose.model('Verb', verbSchema);
exports.Statement = mongoose.model('ActivityState', activityStateSchema);
exports.Statement = mongoose.model('ActivityProfile', activityProfileSchema);
exports.Statement = mongoose.model('Statement', statementSchema);
