
/*
 * GET home page.
 */

exports.index = {
    "get": function(req, res) {
        var body = JSON.stringify(exports.question);
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length', body.length);
        res.end(body);
    },
    "head": function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length', body.length);
    }
};

answer_listing = {
    "get": function(req, res) {},
    "head": function(req, res) {}
};

answer_comment_listing = {
    "get": function(req, res) {},
    "head": function(req, res) {}
};

answer_comment = {
    "get": function(req, res) {},
    "head": function(req, res) {},
    "post": function(req, res) {},
    "put": function(req, res) {},
    "delete": function(req, res) {},
    "listing": answer_comment_listing
};

question_answer = {
    "get": function(req, res) {},
    "head": function(req, res) {},
    "post": function(req, res) {},
    "put": function(req, res) {},
    "delete": function(req, res) {},
    "listing": answer_listing,
    "comment": answer_comment
};

question_comment_listing = {
    "get": function(req, res) {},
    "head": function(req, res) {}
};

question_comment = {
    "get": function(req, res) {},
    "head": function(req, res) {},
    "post": function(req, res) {},
    "put": function(req, res) {},
    "delete": function(req, res) {},
    "listing": question_comment_listing
};

question_listing = {
    "get": function(req, res) {},
    "head": function(req, res) {}
};

exports.question = {
    "get": function(req, res) {},
    "head": function(req, res) {},
    "post": function(req, res) {},
    "put": function(req, res) {},
    "delete": function(req, res) {},
    "listing": question_listing,
    "answer": question_answer,
    "comment": question_comment
}
