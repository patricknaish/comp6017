/*jslint node: true, devel: true, sloppy:true, unparam: true, nomen: true, indent:4, es5: true*/
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


// tput setaf 2
// echo "\nGET /"
// tput sgr0
// curl -s http://localhost:3000 | python -mjson.tool

// tput setaf 2
// echo "\nGET /user"
// tput sgr0
// curl -s http://localhost:3000/user | python -mjson.tool

// tput setaf 2
// echo "\nGET /question"
// tput sgr0
// curl -s http://localhost:3000/question | python -mjson.tool

// tput setaf 2
// echo "\nPOST \"name=TestUser\" > /user"
// tput sgr0
// curl -sX POST -d "name=TestUser" http://localhost:3000/user | python -mjson.tool

// tput setaf 2
// echo "\nPOST \"name=AnotherUser\" > /user"
// tput sgr0
// curl -sX POST -d "name=AnotherUser" http://localhost:3000/user | python -mjson.tool

// tput setaf 2
// echo "\nGET /user"
// tput sgr0
// curl -s http://localhost:3000/user | python -mjson.tool

// tput setaf 2
// echo "\nGET /user/1"
// tput sgr0
// curl -s http://localhost:3000/user/1 | python -mjson.tool

// tput setaf 2
// echo "\nPUT \"name=TestingUser\" > /user/1"
// tput sgr0
// curl -sX PUT -d "name=TestingUser" http://localhost:3000/user/1 | python -mjson.tool

// tput setaf 2
// echo "\nGET /user/1"
// tput sgr0
// curl -s http://localhost:3000/user/1 | python -mjson.tool

// tput setaf 2
// echo "\nTest cascading deletes on question comments"
// tput setaf 3
// echo Creating question...
// curl -sX POST -d "title=Test+Question&question=This+is+a+test&author_id=1" http://localhost:3000/question > /dev/null
// echo Adding first comment...
// curl -sX POST -d "comment=This+is+a+test+comment&author_id=2" http://localhost:3000/question/1/comment > /dev/null
// echo Adding second comment...
// curl -sX POST -d "comment=This+is+another+test+comment&author_id=2" http://localhost:3000/question/1/comment > /dev/null
// echo Listing comments...
// tput sgr0
// curl -s http://localhost:3000/question/1/comment | python -mjson.tool
// tput setaf 3
// echo Deleting question...
// curl -sX DELETE http://localhost:3000/question/1 > /dev/null
// echo Listing comments...
// tput sgr0
// curl -s http://localhost:3000/question/1/comment | python -mjson.tool

// tput setaf 2
// echo "\nTest cascading deletes on answer comments"
// tput setaf 3
// echo Creating question...
// curl -sX POST -d "title=Test+Question&question=This+is+a+test&author_id=1" http://localhost:3000/question > /dev/null
// echo Creating answer...
// curl -sX POST -d "answer=This+is+a+test+answer&author_id=2" http://localhost:3000/question/2/answer > /dev/null
// echo Adding first comment...
// curl -sX POST -d "comment=This+is+a+test+comment&author_id=1" http://localhost:3000/question/2/answer/1/comment > /dev/null
// echo Adding second comment...
// curl -sX POST -d "comment=This+is+another+test+comment&author_id=1" http://localhost:3000/question/2/answer/1/comment > /dev/null
// echo Listing comments...
// tput sgr0
// curl -s http://localhost:3000/question/2/answer/1/comment | python -mjson.tool
// tput setaf 3
// echo Deleting answer...
// curl -sX DELETE http://localhost:3000/question/2/answer/1 > /dev/null
// echo Listing comments...
// tput sgr0
// curl -s http://localhost:3000/question/2/answer/1/comment | python -mjson.tool

// tput setaf 2
// echo "\nTest cascading deletes on question answers"
// tput setaf 3
// echo Creating question...
// curl -sX POST -d "title=Test+Question&question=This+is+a+test&author_id=1" http://localhost:3000/question > /dev/null
// echo Creating first answer...
// curl -sX POST -d "answer=This+is+a+test+answer&author_id=2" http://localhost:3000/question/3/answer > /dev/null
// echo Creating second answer...
// curl -sX POST -d "answer=This+is+another+test+answer&author_id=2" http://localhost:3000/question/3/answer > /dev/null
// echo Listing answers...
// tput sgr0
// curl -s http://localhost:3000/question/3/answer | python -mjson.tool
// tput setaf 3
// echo Deleting question...
// curl -sX DELETE http://localhost:3000/question/3 > /dev/null
// echo Listing answers...
// tput sgr0
// curl -s http://localhost:3000/question/3/answer | python -mjson.tool