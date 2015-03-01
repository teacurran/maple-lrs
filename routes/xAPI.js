var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/statements')

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function (req, res) {
		res.send('get');
	})

	.post(function (req, res) {
		res.send('post');
	})

	.put(function (req, res) {
		res.send('put');
	})

;



module.exports = router;
