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
        it("should delete a user", function (done) {
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
        it("should delete a question", function (done) {
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

describe("Answers", function () {
    describe("Listing", function () {
        it("should not return an error", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.get("http://localhost:3000/question/" + questionId + "/answer", function (error, response, body) {
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
                    request.get("http://localhost:3000/question/" + questionId + "/answer", function (error, response, body) {
                        assert.equal(200, response.statusCode);
                        done();
                    });
                });
            });
        });
        it("should return an empty array without answers", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.get({url: "http://localhost:3000/question/" + questionId + "/answer", json: true}, function (error, response, body) {
                        assert.deepEqual([], body);
                        done();
                    });
                });
            });
        });
        it("should return a populated array with answers", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        request.get({url: "http://localhost:3000/question/" + questionId + "/answer", json: true}, function (error, response, body) {
                            assert.equal(1, body.length);
                            done();
                        });
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
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        assert.ifError(error);
                        done();
                    });
                });
            });
        });
        it("should have HTTP status 201", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        assert.equal(201, response.statusCode);
                        done();
                    });
                });
            });
        });
        it("should return a Location header", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        assert(response.headers.location);
                        done();
                    });
                });
            });
        });
        it("should create a retrievable answer", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.get("http://localhost:3000/question/" + questionId + "/answer/" + answerId, function (error, response, body) {
                            body = JSON.parse(body);
                            assert.equal("Test Answer", body.answer);
                            done();
                        });
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
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.put("http://localhost:3000/question/" + questionId + "/answer/" + answerId, {form: {"author_id": userId, "answer": "Test Answer 2"}}, function (error, response, body) {
                            assert.ifError(error);
                            done();
                        });
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
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.put("http://localhost:3000/question/" + questionId + "/answer/" + answerId, {form: {"author_id": userId, "answer": "Test Answer 2"}}, function (error, response, body) {
                            assert.equal(200, response.statusCode);
                            done();
                        });
                    });
                });
            });
        });
        it("should update a retrievable answer", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.put("http://localhost:3000/question/" + questionId + "/answer/" + answerId, {form: {"author_id": userId, "answer": "Test Answer 2"}}, function (error, response, body) {
                            request.get("http://localhost:3000/question/" + questionId + "/answer/" + answerId, function (error, response, body) {
                                body = JSON.parse(body);
                                assert.equal("Test Answer 2", body.answer);
                                done();
                            });
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
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.del("http://localhost:3000/question/" + questionId + "/answer/" + answerId, function (error, response, body) {
                            assert.ifError(error);
                            done();
                        });
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
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.del("http://localhost:3000/question/" + questionId + "/answer/" + answerId, function (error, response, body) {
                            assert.equal(204, response.statusCode);
                            done();
                        });
                    });
                });
            });
        });
        it("should delete an answer", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.del("http://localhost:3000/question/" + questionId + "/answer/" + answerId, function (error, response, body) {
                            request.get("http://localhost:3000/question/" + questionId + "/answer/" + answerId, function (error, response, body) {
                                assert.equal(404, response.statusCode);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
});

describe("Question comments", function () {
    describe("Listing", function () {
        it("should not return an error", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.get("http://localhost:3000/question/" + questionId + "/comment", function (error, response, body) {
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
                    request.get("http://localhost:3000/question/" + questionId + "/comment", function (error, response, body) {
                        assert.equal(200, response.statusCode);
                        done();
                    });
                });
            });
        });
        it("should return an empty array without comments", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.get({url: "http://localhost:3000/question/" + questionId + "/comment", json: true}, function (error, response, body) {
                        assert.deepEqual([], body);
                        done();
                    });
                });
            });
        });
        it("should return a populated array with comments", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                        request.get({url: "http://localhost:3000/question/" + questionId + "/comment", json: true}, function (error, response, body) {
                            assert.equal(1, body.length);
                            done();
                        });
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
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                        assert.ifError(error);
                        done();
                    });
                });
            });
        });
        it("should have HTTP status 201", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                        assert.equal(201, response.statusCode);
                        done();
                    });
                });
            });
        });
        it("should return a Location header", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                        assert(response.headers.location);
                        done();
                    });
                });
            });
        });
        it("should create a retrievable comment", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var commentId = body.id;
                        request.get("http://localhost:3000/question/" + questionId + "/comment/" + commentId, function (error, response, body) {
                            body = JSON.parse(body);
                            assert.equal("Test Comment", body.comment);
                            done();
                        });
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
                    request.post("http://localhost:3000/question/" + questionId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var commentId = body.id;
                        request.put("http://localhost:3000/question/" + questionId + "/comment/" + commentId, {form: {"author_id": userId, "comment": "Test Comment 2"}}, function (error, response, body) {
                            assert.ifError(error);
                            done();
                        });
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
                    request.post("http://localhost:3000/question/" + questionId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var commentId = body.id;
                        request.put("http://localhost:3000/question/" + questionId + "/comment/" + commentId, {form: {"author_id": userId, "comment": "Test Comment 2"}}, function (error, response, body) {
                            assert.equal(200, response.statusCode);
                            done();
                        });
                    });
                });
            });
        });
        it("should update a retrievable answer", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var commentId = body.id;
                        request.put("http://localhost:3000/question/" + questionId + "/comment/" + commentId, {form: {"author_id": userId, "comment": "Test Comment 2"}}, function (error, response, body) {
                            request.get("http://localhost:3000/question/" + questionId + "/comment/" + commentId, function (error, response, body) {
                                body = JSON.parse(body);
                                assert.equal("Test Comment 2", body.comment);
                                done();
                            });
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
                    request.post("http://localhost:3000/question/" + questionId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var commentId = body.id;
                        request.del("http://localhost:3000/question/" + questionId + "/comment/" + commentId, function (error, response, body) {
                            assert.ifError(error);
                            done();
                        });
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
                    request.post("http://localhost:3000/question/" + questionId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var commentId = body.id;
                        request.del("http://localhost:3000/question/" + questionId + "/comment/" + commentId, function (error, response, body) {
                            assert.equal(204, response.statusCode);
                            done();
                        });
                    });
                });
            });
        });
        it("should delete an answer", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var commentId = body.id;
                        request.del("http://localhost:3000/question/" + questionId + "/comment/" + commentId, function (error, response, body) {
                            request.get("http://localhost:3000/question/" + questionId + "/comment/" + commentId, function (error, response, body) {
                                assert.equal(404, response.statusCode);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
});

describe("Answer comments", function () {
    describe("Listing", function () {
        it("should not return an error", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.get("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", function (error, response, body) {
                            assert.ifError(error);
                            done();
                        });
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
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.get("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", function (error, response, body) {
                            assert.equal(200, response.statusCode);
                            done();
                        });
                    });
                });
            });
        });
        it("should return an empty array without answers", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.get({url: "http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", json: true}, function (error, response, body) {
                            assert.deepEqual([], body);
                            done();
                        });
                    });
                });
            });
        });
        it("should return a populated array with answers", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.post("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                            body = JSON.parse(body);
                            var commentId = body.id;
                            request.get({url: "http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", json: true}, function (error, response, body) {
                                assert.equal(1, body.length);
                                done();
                            });
                        });
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
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.post("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                            assert.ifError(error);
                            done();
                        });
                    });
                });
            });
        });
        it("should have HTTP status 201", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.post("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                            assert.equal(201, response.statusCode);
                            done();
                        });
                    });
                });
            });
        });
        it("should return a Location header", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.post("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                            assert(response.headers.location);
                            done();
                        });
                    });
                });
            });
        });
        it("should create a retrievable answer", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.post("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                            body = JSON.parse(body);
                            var commentId = body.id;
                            request.get("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment/" + commentId, function (error, response, body) {
                                body = JSON.parse(body);
                                assert.equal("Test Comment", body.comment);
                                done();
                            });
                        });
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
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.post("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                            body = JSON.parse(body);
                            var commentId = body.id;
                            request.put("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment/" + commentId, {form: {"author_id": userId, "comment": "Test Comment 2"}}, function (error, response, body) {
                                assert.ifError(error);
                                done();
                            });
                        });
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
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.post("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                            body = JSON.parse(body);
                            var commentId = body.id;
                            request.put("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment/" + commentId, {form: {"author_id": userId, "comment": "Test Comment 2"}}, function (error, response, body) {
                                assert.equal(200, response.statusCode);
                                done();
                            });
                        });
                    });
                });
            });
        });
        it("should update a retrievable answer", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.post("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                            body = JSON.parse(body);
                            var commentId = body.id;
                            request.put("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment/" + commentId, {form: {"author_id": userId, "comment": "Test Comment 2"}}, function (error, response, body) {
                                request.get("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment/" + commentId, function (error, response, body) {
                                    body = JSON.parse(body);
                                    assert.equal("Test Comment 2", body.comment);
                                    done();
                                });
                            });
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
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.post("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                            body = JSON.parse(body);
                            var commentId = body.id;
                            request.del("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment/" + commentId, function (error, response, body) {
                                assert.ifError(error);
                                done();
                            });
                        });
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
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.post("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                            body = JSON.parse(body);
                            var commentId = body.id;
                            request.del("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment/" + commentId, function (error, response, body) {
                                assert.equal(204, response.statusCode);
                                done();
                            });
                        });
                    });
                });
            });
        });
        it("should delete an answer", function (done) {
            request.post("http://localhost:3000/user", {form: {"name": "TestUser"}}, function (error, response, body) {
                body = JSON.parse(body);
                var userId = body.id;
                request.post("http://localhost:3000/question", {form: {"author_id": userId, "title": "Test Title", "question": "Test Question"}}, function (error, response, body) {
                    body = JSON.parse(body);
                    var questionId = body.id;
                    request.post("http://localhost:3000/question/" + questionId + "/answer", {form: {"author_id": userId, "answer": "Test Answer"}}, function (error, response, body) {
                        body = JSON.parse(body);
                        var answerId = body.id;
                        request.post("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment", {form: {"author_id": userId, "comment": "Test Comment"}}, function (error, response, body) {
                            body = JSON.parse(body);
                            var commentId = body.id;
                            request.del("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment/" + commentId, function (error, response, body) {
                                request.get("http://localhost:3000/question/" + questionId + "/answer/" + answerId + "/comment/" + commentId, function (error, response, body) {
                                    assert.equal(404, response.statusCode);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});