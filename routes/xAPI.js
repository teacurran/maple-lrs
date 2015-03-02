var express = require('express');
var router = express.Router();

var Statement     = require('../app/models/statement');

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.route('/statements')

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function (req, res) {
		res.send('get');
	})

	.post(function (req, res) {

		var statement = new Statement();
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
