var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var querystring = require('querystring');

describe('Routing', function () {
	var url = 'http://127.0.0.1:3000';

	before(function (done) {
		done();
	});

	describe('statements', function () {

		var statementId = "1234";
		var statement = {
			id: statementId
		};

		it('post statement', function (done) {
			request(url)
				.post('/xAPI/statements')
				.send(statement)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});

		it('put statement', function (done) {
			request(url)
				.put('/xAPI/statements')
				.send("statementId=" + statementId)
				.send(statement)
				.expect(204)
				.end(function (err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});

		it('get statement', function (done) {

			var urlWithQuery = "/xAPI/statements?" + querystring.stringify({
					statementId: statementId
				});

			request(url)
				.get(urlWithQuery)

				.expect(200)
				.end(function (err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});
	});
});


