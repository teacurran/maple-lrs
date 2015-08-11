var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
	homePage: String,
	name: String
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
	timestamp: String
});


var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});


exports.Account = mongoose.model('Account', accountSchema);
exports.Verb = mongoose.model('Verb', verbSchema);
exports.Statement = mongoose.model('Statement', statementSchema);
