
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
    "get": function(req, res) {
        req.models.question_answer.find({question_id: req.params.qid}, function(err, question) {
            if(!err) {
                body = JSON.stringify(question);
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.send(body);
            } else {
                var error = JSON.stringify({
                    "error": "No question found with id "+req.params.qid
                });
                res.setHeader('Content-Type', 'application.json');
                res.statusCode = 404;
                res.end(error);
            }
        });
    },
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
    "get": function(req, res) {
        req.models.question_answer.get(req.params.aid, function(err, answer) {
            if(!err) {
                res.json(answer);
            } else {
                res.json({"error": "No answer found for "+req.params.aid});
                res.statusCode = 404;
            }
        });
    },
    "post": function(req, res) {
        req.models.question_answer.create([{
            answer : req.body.answer,
            author_id: req.body.author_id,
            question_id: req.params.qid,
            created: new Date()
        }], function(err, items) {
            if(err) {
                res.json(err);
                return;
            }

            res.json(items[0]);
        });
    },
    "put": function(req, res) {
        req.models.question_answer.get(req.params.aid, function(err, answer) {
            if(err) {
                res.json({"error": "No answer found for "+req.params.aid});
                return;
            }
            if(req.body.answer) { answer.answer = req.body.answer; }
            if(req.body.author_id) { answer.author_id = req.body.author_id; }
            answer.updated = new Date();
            answer.save(function(err) {
                if(err) {
                    res.json({"error": err});
                    return;
                }

                res.json(answer);
            });
        });
    },
    "delete": function(req, res) {
        req.models.question_answer.get(req.params.aid, function(err, answer) {
            if(err) {
                res.json({"error": err});
                return;
            }
            answer.remove(function(err) {
                if(err) {
                    res.json({"error": err});
                    return;
                }
                res.json({"status": "removed"});//todo do this right
            })
        });
    },
    "listing": answer_listing,
    "comment": answer_comment
};

question_comment_listing = {
    "get": function(req, res) {
        req.models.question_comment.find({
            "question_id": req.params.qid
        }, function(err, comments) {
            if(err) {
                res.json({"error": err});
                return;
            }
            res.json(comments);
        });
    }
};

question_comment = {
    "get": function(req, res) {
        req.models.question_comment.get(req.params.cid, function(err, comment) {
            if(err) {
                res.json({"error": err});
                return;
            }
            res.json(comment);
        })
    },
    "post": function(req, res) {
        req.models.question_comment.create([
            {
                "comment": req.body.comment,
                "author_id": req.body.author_id,
                "created": new Date(),
                "question_id": req.params.qid
            }
        ], function(err, comment) {
            if(err) {
                res.json({"error": err});
                return;
            }
            res.json(comment);
        })
    },
    "put": function(req, res) {
        req.models.question_comment.get(req.params.cid, function(err, comment) {
            if(err) {
                res.json({"error": err});
                return;
            }
            if(req.body.comment) { comment.comment = req.body.comment; }
            comment.updated = new Date();
            comment.save(function(err) {
                if(err) {
                    res.json({"error": err});
                    return;
                }
                res.json(comment);
            });
        });
    },
    "delete": function(req, res) {
        req.models.question_comment.get(req.params.cid, function(err, comment) {
            if(err) {
                res.json({"error": err});
                return;
            }
            comment.remove(function(err) {
                if(err) {
                    res.json({"error": err});
                    return;
                }
                res.json({"status": "removed"});
            });
        });},
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
                var body = question.render();
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
