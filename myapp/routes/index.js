
/*
 * GET home page.
 */

exports.index = {
    "get": function(req, res) {
        var body = JSON.stringify(exports);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', body.length);
        res.end(body);
    },
    "head": function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', 0);
        res.end();
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
    "get": function(req, res) {
        questions = req.models.question.find({}, function(err, questions) {
            if(!err) {
                var body = JSON.stringify(questions);
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Length', body.length);
                res.statusCode = 200;
                res.end(body);
            } else {
                var error = JSON.stringify({
                    "error": err
                });
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Length', error.length);
                res.statusCode = 500;
                res.end(error);
            }
        });  
    },
    "head": function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', 0);
        res.end();
    }
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
