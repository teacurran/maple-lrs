var express = require('express');
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
			models.Statement.findById(statementId, function (err, statement) {
				if (err) {
					res.send(err);
				}
				res.json(statement);
			});
		}
	})

	.post(function (req, res) {

		var statement = new models.Statement();
		statement.id = req.body.statementId;

		statement.save(function (err) {
			if (err) {
				res.send(err);
			}

		});

		res.sendStatus(200);
	})

	.put(function (req, res) {
		res.send('put');
	})

;


module.exports = router;
