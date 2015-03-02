var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');

describe('Routing', function () {
	var url = 'http://127.0.0.1:3000';

	before(function (done) {
		done();
	});

	describe('statements', function () {
		it('get statement', function (done) {
			request(url)
				.get('/xAPI/statements')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		})
	});
});


