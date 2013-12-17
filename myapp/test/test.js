/*jslint node: true, devel: true, sloppy:true, unparam: true, nomen: true, indent:4*/
/*global describe, it*/
var assert = require("assert");
var request = require("request");

describe("Root", function () {
    describe("Listing", function () {
        it("should not return an error", function (done) {
            request.get("http://localhost:3000", function (error, response, body) {
                assert.ifError(error);
                done();
            });
        });
        it("should have HTTP status 200", function (done) {
            request.get("http://localhost:3000", function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            });
        });
        it("should list links to self, questions, users", function (done) {
            request.get({url: "http://localhost:3000", json: true}, function (error, response, body) {
                assert.deepEqual({
                    "links": {
                        "questions": "/question",
                        "users": "/user",
                        "self": "/"
                    }
                }, body);
                done();
            });
        });
    });
});

describe("Users", function () {
    describe("Listing", function () {
        it("should not return an error", function (done) {
            request.get("http://localhost:3000/user", function (error, response, body) {
                assert.ifError(error);
                done();
            });
        });
        it("should have HTTP status 200", function (done) {
            request.get("http://localhost:3000/user", function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            });
        });
        it("should return an empty array without users", function (done) {
            request.get({url: "http://localhost:3000/user", json: true}, function (error, response, body) {
                assert.deepEqual([], body);
                done();
            });
        });
        it("should return a populated array with users", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                request.get({url: "http://localhost:3000/user", json: true}, function (error, response, body) {
                    assert.equal(1, body.length);
                    done();
                });
            });
        });
    });
    describe("Creation", function () {
        it("should not return an error", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                assert.ifError(error);
                done();
            });
        });
        it("should have HTTP status 201", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                assert.equal(201, response.statusCode);
                done();
            });
        });
        it("should return a Location header", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                assert(response.headers.location);
                done();
            });
        });
        it("should create a retrievable user", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var questionId = body.id;
                request.get("http://localhost:3000/user/" + questionId, function (error, response, body) {
                    body = JSON.parse(body);
                    assert.equal("TestUser", body.name);
                    done();
                });
            });
        });
    });
    describe("Updating", function () {
        it("should not return an error", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var questionId = body.id;
                request.put("http://localhost:3000/user/" + questionId, {form: {"name": "UpdatedTestUser"}}, function (error, response, body) {
                    assert.ifError(error);
                    done();
                });
            });
        });
        it("should have HTTP status 200", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var questionId = body.id;
                request.put("http://localhost:3000/user/" + questionId, {form: {"name": "UpdatedTestUser"}}, function (error, response, body) {
                    assert.equal(200, response.statusCode);
                    done();
                });
            });
        });
        it("should update a retrievable user", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var questionId = body.id;
                request.put("http://localhost:3000/user/" + questionId, {form: {"name": "UpdatedTestUser"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    request.get("http://localhost:3000/user/" + questionId, function (error, response, body) {
                        body = JSON.parse(body);
                        assert.equal("UpdatedTestUser", body.name);
                        done();
                    });
                });
            });
        });
    });
    describe("Deleting", function () {
        it("should not return an error", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var questionId = body.id;
                request.del("http://localhost:3000/user/" + questionId, function (error, response, body) {
                    assert.ifError(error);
                    done();
                });
            });
        });
        it("should have HTTP status 204", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var questionId = body.id;
                request.del("http://localhost:3000/user/" + questionId, function (error, response, body) {
                    assert.equal(204, response.statusCode);
                    done();
                });
            });
        });
        it("should update a retrievable user", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var questionId = body.id;
                request.del("http://localhost:3000/user/" + questionId, function (error, response, body) {
                    request.get("http://localhost:3000/user/" + questionId, function (error, response, body) {
                        assert.equal(404, response.statusCode);
                        done();
                    });
                });
            });
        });
    });
});

describe("Questions", function () {
    describe("Listing", function () {
        it("should not return an error", function (done) {
            request.get("http://localhost:3000/question", function (error, response, body) {
                assert.ifError(error);
                done();
            });
        });
        it("should have HTTP status 200", function (done) {
            request.get("http://localhost:3000/question", function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            });
        });
        it("should return an empty array without questions", function (done) {
            request.get({url: "http://localhost:3000/question", json: true}, function (error, response, body) {
                assert.deepEqual([], body);
                done();
            });
        });
        it("should return a populated array with questions", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    request.get({url: "http://localhost:3000/question", json: true}, function (error, response, body) {
                        assert.equal(1, body.length);
                        done();
                    });
                });
            });
        });
    });
    describe("Creation", function () {
        it("should not return an error", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    assert.ifError(error);
                    done();
                });
            });
        });
        it("should have HTTP status 201", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    assert.equal(201, response.statusCode);
                    done();
                });
            });
        });
        it("should return a Location header", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    assert(response.headers.location);
                    done();
                });
            });
        });
        it("should create a retrievable question", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.get("http://localhost:3000/question/" + questionId, function (error, response, body) {
                        body = JSON.parse(body);
                        assert.equal("Test Title", body.title);
                        assert.equal("Test Question", body.question);
                        done();
                    });
                });
            });
        });
    });
    describe("Updating", function () {
        it("should not return an error", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.put("http://localhost:3000/question/" + questionId, {form: {"name": "UpdatedTestquestion"}}, function (error, response, body) {
                        assert.ifError(error);
                        done();
                    });
                });
            });
        });
        it("should have HTTP status 200", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.put("http://localhost:3000/question/" + questionId, {form: {"name": "UpdatedTestquestion"}}, function (error, response, body) {
                        assert.equal(200, response.statusCode);
                        done();
                    });
                });
            });
        });
        it("should update a retrievable question", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.put("http://localhost:3000/question/" + questionId, {form: {"author_id": userId, "title": "Test Title 2", "question": "Test Question 2"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        request.get("http://localhost:3000/question/" + questionId, function (error, response, body) {
                            body = JSON.parse(body);
                            assert.equal("Test Title 2", body.title);
                            assert.equal("Test Question 2", body.question);
                            done();
                        });
                    });
                });
            });
        });
    });
    describe("Deleting", function () {
        it("should not return an error", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.del("http://localhost:3000/question/" + questionId, function (error, response, body) {
                        assert.ifError(error);
                        done();
                    });
                });
            });
        });
        it("should have HTTP status 204", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.del("http://localhost:3000/question/" + questionId, function (error, response, body) {
                        assert.equal(204, response.statusCode);
                        done();
                    });
                });
            });
        });
        it("should update a retrievable question", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.del("http://localhost:3000/question/" + questionId, function (error, response, body) {
                        request.get("http://localhost:3000/question/" + questionId, function (error, response, body) {
                            assert.equal(404, response.statusCode);
                            done();
                        });
                    });
                });
            });
        });
    });
});