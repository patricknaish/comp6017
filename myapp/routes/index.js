/*jslint node: true, devel: true, sloppy:true, unparam: true, nomen: true, indent:4, es5: true*/

/*
 * GET home page.
 */
exports.index = {
    "get": function (req, res) {
        res.json(exports);
    }
};

var answer_listing = {
    "get": function (req, res) {
        req.models.question_answer.find({question_id: req.params.qid}, function (err, answers) {
            if (err) {
                res.statusCode = 404;
                res.json({"error": "No question found for " + req.params.qid});
                return;
            }
            var body = [];
            var i;
            for (i = 0; i < answers.length; i++) {
                body.push(answers[i].render());
            }
            res.json(body);
        });
    }
};

var answer_comment_listing = {
    "get": function (req, res) {
        req.models.answer_comment.find({
            "answer_id": req.params.aid
        }, function (err, comments) {
            if (err) {
                res.statusCode = 404;
                res.json({"error": err});
                return;
            }
            var body = [];
            var i;
            for (i = 0; i < comments.length; i++) {
                body.push(comments[i].render());
            }
            res.json(body);
        });
    }
};

var answer_comment = {
    "get": function (req, res) {
        req.models.answer_comment.get(req.params.cid, function (err, comment) {
            if (err) {
                res.json({"error": err});
                return;
            }
            res.json(comment.render());
        });
    },
    "post": function (req, res) {
        req.models.answer_comment.create([
            {
                "comment": req.body.comment,
                "author_id": req.body.author_id,
                "created": new Date(),
                "answer_id": req.params.aid
            }
        ], function (err, items) {
            if (err) {
                res.statusCode = 500;
                res.json({"error": err});
                return;
            }
            res.statusCode = 201;
            res.json(items[0].render());
        });
    },
    "put": function (req, res) {
        req.models.answer_comment.get(req.params.cid, function (err, comment) {
            if (err) {
                res.json({"error": err});
                return;
            }
            if (req.body.comment) { comment.comment = req.body.comment; }
            comment.updated = new Date();
            comment.save(function (err) {
                if (err) {
                    res.json({"error": err});
                    return;
                }
                res.json(comment.render());
            });
        });
    },
    "delete": function (req, res) {
        req.models.answer_comment.get(req.params.cid, function (err, comment) {
            if (err) {
                res.json({"error": err});
                return;
            }
            comment.remove(function (err) {
                if (err) {
                    res.json({"error": err});
                    return;
                }
                res.json({"status": "removed"});
            });
        });
    },
    "listing": answer_comment_listing
};

var question_answer = {
    "get": function (req, res) {
        req.models.question_answer.get(req.params.aid, function (err, answer) {
            if (err) {
                res.statusCode = 404;
                res.json({"error": "No answer found for " + req.params.aid});
                return;
            }
            res.json(answer.render());
        });
    },
    "post": function (req, res) {
        req.models.question_answer.create([
            {
                "answer" : req.body.answer,
                "author_id": req.body.author_id,
                "question_id": req.params.qid,
                "created": new Date()
            }
        ], function (err, items) {
            if (err) {
                res.statusCode = 500;
                res.json({"error": err});
                return;
            }
            res.statusCode = 201;
            res.json(items[0].render());
        });
    },
    "put": function (req, res) {
        req.models.question_answer.get(req.params.aid, function (err, answer) {
            if (err) {
                res.statusCode = 404;
                res.json({"error": "No answer found for " + req.params.aid});
                return;
            }
            if (req.body.answer) { answer.answer = req.body.answer; }
            if (req.body.author_id) { answer.author_id = req.body.author_id; }
            answer.updated = new Date();
            answer.save(function (err) {
                if (err) {
                    res.statusCode = 500;
                    res.json({"error": err});
                    return;
                }
                res.json(answer.render());
            });
        });
    },
    "delete": function (req, res) {
        req.models.question_answer.get(req.params.aid, function (err, answer) {
            if (err) {
                res.statusCode = 404;
                res.json({"error": "No answer found for " + req.params.aid});
                return;
            }
            answer.remove(function (err) {
                if (err) {
                    res.statusCode = 500;
                    res.json({"error": err});
                    return;
                }
                res.json({"status": "removed"});//todo do this right
            });
        });
    },
    "listing": answer_listing,
    "comment": answer_comment
};

var question_comment_listing = {
    "get": function (req, res) {
        req.models.question_comment.find({
            "question_id": req.params.qid
        }, function (err, comments) {
            if (err) {
                res.statusCode = 404;
                res.json({"error": err});
                return;
            }
            var body = [];
            var i;
            for (i = 0; i < comments.length; i++) {
                body.push(comments[i].render());
            }
            res.json(body);
        });
    }
};

var question_comment = {
    "get": function (req, res) {
        req.models.question_comment.get(req.params.cid, function (err, comment) {
            if (err) {
                res.json({"error": err});
                return;
            }
            res.json(comment.render());
        });
    },
    "post": function (req, res) {
        req.models.question_comment.create([
            {
                "comment": req.body.comment,
                "author_id": req.body.author_id,
                "created": new Date(),
                "question_id": req.params.qid
            }
        ], function (err, items) {
            if (err) {
                res.statusCode = 500;
                res.json({"error": err});
                return;
            }
            res.statusCode = 201;
            res.json(items[0].render());
        });
    },
    "put": function (req, res) {
        req.models.question_comment.get(req.params.cid, function (err, comment) {
            if (err) {
                res.json({"error": err});
                return;
            }
            if (req.body.comment) { comment.comment = req.body.comment; }
            comment.updated = new Date();
            comment.save(function (err) {
                if (err) {
                    res.json({"error": err});
                    return;
                }
                res.json(comment.render());
            });
        });
    },
    "delete": function (req, res) {
        req.models.question_comment.get(req.params.cid, function (err, comment) {
            if (err) {
                res.json({"error": err});
                return;
            }
            comment.remove(function (err) {
                if (err) {
                    res.json({"error": err});
                    return;
                }
                res.json({"status": "removed"});
            });
        });
    },
    "listing": question_comment_listing
};

var question_listing = {
    "get": function (req, res) {
        req.models.question.find({}, function (err, questions) {
            if (err) {
                res.statusCode = 404;
                res.json({"error": err});
                return;
            }
            var body = [];
            var i;
            for (i = 0; i < questions.length; i++) {
                body.push(questions[i].render());
            }
            res.json(body);
        });
    }
};

exports.question = {
    "get": function (req, res) {
        req.models.question.get(req.params.qid, function (err, question) {
            if (err) {
                res.statusCode = 404;
                res.json({"error": "No question found for " + req.params.qid});
                return;
            }
            res.json(question.render());
        });
    },
    "post": function (req, res) {
        req.models.question.create([
            {
                "title": req.body.title,
                "question": req.body.question,
                "author_id": req.body.author_id,
                "created": new Date()
            }
        ], function (err, items) {
            if (err) {
                res.statusCode = 500;
                res.json({"error": err});
                return;
            }
            res.statusCode = 201;
            res.json(items[0].render());
        });
    },
    "put": function (req, res) {
        req.models.question.get(req.params.qid, function (err, question) {
            if (err) {
                res.statusCode = 404;
                res.json4({"error": "No question found for " + req.params.qid});
                return;
            }
            if (req.body.question) { question.question = req.body.question; }
            if (req.body.title) { question.title = req.body.title; }
            question.updated = new Date();
            question.save(function (err) {
                if (err) {
                    res.statusCode = 500;
                    res.json({"error": err});
                    return;
                }
                res.json(question.render());
            });
        });
    },
    "delete": function (req, res) {
        req.models.question.get(req.params.qid, function (err, question) {
            if (err) {
                res.statusCode = 404;
                res.json({"error": "No question found for " + req.params.qid});
                return;
            }
            question.remove(function (err) {
                if (err) {
                    res.statusCode = 500;
                    res.json({"error": err});
                    return;
                }
                res.json({"status": "removed"});
            });
        });
    },
    "listing": question_listing,
    "answer": question_answer,
    "comment": question_comment
};
