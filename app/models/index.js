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

var documentSchema = new Schema({
	documentId: String,
	updated: { type : Date, default: Date.now },
	contents: Buffer
});

var verbSchema = new Schema({
	id: String,
	display: [{
		language: String,
		value: String
	}]
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
	timestamp: String,
	attachments: [{
		usageType: String,
		display: [{
			language: String,
			value: String
		}],
		description: [{
			language: String,
			value: String
		}],
		contentType: String,
		length: Number,
		sha2: String,
		fileUrl: String
	}]
});

exports.Account = mongoose.model('Account', accountSchema);
exports.Document = mongoose.model('Document', documentSchema);
exports.Verb = mongoose.model('Verb', verbSchema);
exports.Statement = mongoose.model('ActivityState', activityStateSchema);
exports.Statement = mongoose.model('ActivityProfile', activityProfileSchema);
exports.Statement = mongoose.model('Statement', statementSchema);
