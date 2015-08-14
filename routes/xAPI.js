var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var models     = require('../app/models');

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.route('/statements')

	.get(function (req, res) {

		var statementId = req.query.statementId;

		if (statementId != null) {
			models.Statement.findOne().lean().exec({statementId: statementId}, function (err, statement) {
				if (err) {
					res.send(err);
				}
				statement.id = statement.statementId;
				delete statement.statementId;

				res.json(statement);
			});
		}
	})

	.post(function (req, res) {

		var inStatements;
		if (Object.prototype.toString.call(req.body) === '[object Array]') {
			inStatements = req.body;
		} else if (typeof req.body.id === 'string') {
			inStatements[0] = req.body;
		}

		for (var i = 0; i < inStatements.length; i++) {
			var inStatement = inStatements[i];

			var statement = new models.Statement({
				statementId: inStatement.id,
				actor: inStatement.actor,
				verb: inStatement.verb
			});

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
			statementId: req.body.id,
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
