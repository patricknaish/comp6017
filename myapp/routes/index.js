
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
        req.models.question.find({}, function(err, questions) {
            if(!err) {
                var body = [];
                for (var i = 0; i < questions.length; i++) {
                    body.push(questions[i].render());
                }
                body = JSON.stringify(body);
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
    "get": function(req, res) {
        req.models.question.get(req.params.qid, function(err, question) {
            if (!err) {
                var body = question[0].render();
                body = JSON.stringify(body);
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Length', body.length);
                res.statusCode = 200;
                res.end(body);
            } else {
                var error = JSON.stringify({
                    "error": "No question found with id "+req.params.qid
                });
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Length', error.length);
                res.statusCode = 404;
                res.end(error);
            }
        });
    },
    "head": function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', 0);
        res.end();
    },
    "post": function(req, res) {
        req.models.question.create([{
            title: req.body.title,
            question: req.body.question,
            author_id: req.body.author_id,
            created: new Date()
        }], function(err, items) {
            if(!err) { 
                var body = {
                    created: items[0].render()
                };
                body = JSON.stringify(body);
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Length', body.length);
                res.statusCode = 201;
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
    "put": function(req, res) {
        req.models.question.get(req.params.qid, function(err, question) {
            if(!err) {
                question.question = req.body.question;
                question.title = req.body.title;
                question.updated = new Date();
                question.save(function(err) {
                    if (!err) {
                        var body = {
                            updated: question.render()
                        };
                        body = JSON.stringify(body);
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
            } else {
                var error = JSON.stringify({
                    "error": "No question found with id "+req.params.qid
                });
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Length', error.length);
                res.statusCode = 404;
                res.end(error);
            }
        });
    },
    "delete": function(req, res) {
        req.models.question.get(req.params.qid, function(err, question) {
            if (!err) {
                question.remove(function(err) {
                    if (!err) {
                        var body = {
                            removed: question.render()
                        };
                        body = JSON.stringify(body);
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
            } else {
                var error = JSON.stringify({
                    "error": "No question found with id "+req.params.qid
                });
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Length', error.length);
                res.statusCode = 404;
                res.end(error);
            }
        });
    },
    "listing": question_listing,
    "answer": question_answer,
    "comment": question_comment
}
