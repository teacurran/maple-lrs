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
		var statement =
		{
		    "statementId": statementId,
		    "actor":{
		        "mbox":"mailto:xapi@adlnet.gov"
		    },
		    "verb":{
		        "id":"http://adlnet.gov/expapi/verbs/created",
		        "display":{
		            "en-US":"created"
		        }
		    },
		    "object":{
		        "id":"http://example.adlnet.gov/xapi/example/activity"
		    }
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
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect(statementIdMatches)
				.expect(hasActor)
				.expect(hasVerb)
				.end(function (err, res) {
					if (err) {
						throw err;
					}
					done();
				});

			function statementIdMatches(res) {
				if (res.body.statementId != statementId) {
					return "statementId is incorrect";
				}
			}

			function hasActor(res) {
				if (!('actor' in res.body)) {
					return "missing actor";
				}
			}

			function hasVerb(res) {
				if (!('verb' in res.body)) {
					return "missing verb";
				}
			}
		});
	});
});


