var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatementSchema = new Schema({
	id: String,
	timestamp: String
});

module.exports = mongoose.model('Statement', StatementSchema);