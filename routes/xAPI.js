var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var models     = require('../app/models');
var xApiUtils  = require('../app/xApiUtils');

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.route('/statements')

	.get(function (req, res) {

		var statementId = req.query.statementId;

		if (statementId != null) {
			models.Statement.findOne().lean().exec({id: statementId}, function (err, statement) {
				if (err) {
					res.send(err);
				}

				res.json(statement);
			});
		}
	})

	.post(function (req, res) {

		var inStatements = [];
		if (Object.prototype.toString.call(req.body) === '[object Array]') {
			inStatements = req.body;
		} else if (typeof req.body.id === 'string') {
			inStatements[0] = req.body;
		}

		for (var i = 0; i < inStatements.length; i++) {
			var inStatement = inStatements[i];

			var statement = new models.Statement({
				id: inStatement.id,
				actor: inStatement.actor,
				verb: inStatement.verb
			});

			var inAttachments = inStatement.attachments;
			if (inAttachments && Object.prototype.toString.call(inAttachments) === '[object Array]') {
				statement.attachments = [];
				for (var a = 0; a < inAttachments.length; a++) {
					var inAttachment = inAttachments[a];

					statement.attachments[a] = {
						usageType: inAttachment.usageType,
						display: xApiUtils.getLanguageMap(inAttachment.display),
						description: xApiUtils.getLanguageMap(inAttachment.description),
						contentType: inAttachment.contentType,
						length: inAttachment.length,
						sha2: inAttachment.sha2
					};
				}
			}

			statement.save(function (err, data) {
				if (err) {
					return console.error(err);
				} else {
					console.log('Saved : ', data);
				}
			});
		}

		res.sendStatus(200);
	})

	.put(function (req, res) {
		var statement = new models.Statement({
			id: req.body.id,
			actor: req.body.actor,
			verb: req.body.verb
		});

		statement.save(function (err, data) {
			if (err) {
				return console.error(err);
			} else {
				console.log('Saved : ', data);
			}
		});

		res.sendStatus(204);
	})

;


module.exports = router;
