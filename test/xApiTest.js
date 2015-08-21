var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var querystring = require('querystring');

//var app = require('../app.js')();


describe('tests', function () {

	var url = 'http://127.0.0.1:3000';

	before(function (done) {
		done();
	});

	describe('statements', function () {

		var statement1Id = "1234";
		var statement2Id = "5678";

		var statement = {
			"id": statement1Id,
			"actor": {
				"mbox": "mailto:xapi@fake-domain.co.xx"
			},
			"verb": {
				"id": "http://adlnet.gov/expapi/verbs/created",
				"display": {
					"en-US": "created"
				}
			},
			"object": {
				"id": "http://example.adlnet.gov/xapi/example/activity"
			}
		};

		var multipleStatements = [{
			"id": statement1Id,
			"actor": {
				"mbox": "mailto:xapi@fake-domain.co.xx"
			},
			"verb": {
				"id": "http://adlnet.gov/expapi/verbs/created",
				"display": {
					"en-US": "created"
				}
			},
			"object": {
				"id": "http://example.adlnet.gov/xapi/example/activity"
			}
		}, {
			"id": statement2Id,
			"actor": {
				"mbox": "mailto:xapi@fake-domain.co.xx"
			},
			"verb": {
				"id": "http://adlnet.gov/expapi/verbs/modified",
				"display": {
					"en-US": "modified"
				}
			},
			"object": {
				"id": "http://example.adlnet.gov/xapi/example/activity2"
			}
		}];

		var statementWithAttachments = {
			"id": "1092",
			"actor": {
				"mbox": "mailto:sample.agent@fake-domain.co.xx",
				"name": "Sample Agent",
				"objectType": "Agent"
			},
			"verb": {
				"id": "http://adlnet.gov/expapi/verbs/answered",
				"display": {
					"en-US": "answered"
				}
			},
			"object": {
				"id": "http://www.example.com/tincan/activities/multipart",
				"objectType": "Activity",
				"definition": {
					"name": {
						"en-US": "Multi Part Activity"
					},
					"description": {
						"en-US": "Multi Part Activity Description"
					}
				}
			},
			"attachments": [{
				"usageType": "http://example.com/attachment-usage/test",
				"display": {
					"en-US": "A test attachment"
				},
				"description": {
					"en-US": "A test attachment (description)"
				},
				"contentType": "text/plain; charset=ascii",
				"length": 27,
				"sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a"
			}]
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

		it('post multiple statement', function (done) {
			request(url)
				.post('/xAPI/statements')
				.send(multipleStatements)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});

		it('post statement with attachments', function (done) {
			request(url)
				.post('/xAPI/statements')
				.send(statementWithAttachments)
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
				.send("statementId=" + statement1Id)
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
					statementId: statement1Id
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
				console.log(res.body);
				if (res.body.id != statement1Id) {
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


