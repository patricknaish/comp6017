/*jslint node: true, devel: true, sloppy:true, unparam: true, nomen: true*/

var orm = require('orm');

exports.define = function (app) {
    /* Connect to the database */
    app.use(orm.express("sqlite://database.db", {
        define: function (db, models, next) {
            /* Define the question table */
            models.question = db.define("question", {
                title: {
                    type: "text",
                    required: true
                },
                question: {
                    type: "text",
                    required: true
                },
                created: {
                    type: "date",
                    required: true
                },
                updated: {
                    type: "date",
                    required: false
                },
                author_id: {
                    type: "number",
                    required: true
                }
            }, {
                methods: {
                    /* Method to allow the removal of all comments on a question */
                    removeChildren: function (next) {
                        this.getComments(function (err, comments) {
                            var comment;
                            for (comment = 0; comment < comments.length; comment += 1) {
                                comments[comment].remove();
                            }
                        });
                        this.getAnswers(function (err, answers) {
                            var answer, my_answer, removed = function (removedAnswer) {
                                console.log(removedAnswer);
                                removedAnswer.remove();
                            };
                            for (answer = 0; answer < answers.length; answer += 1) {
                                my_answer = answers[answer];
                                my_answer.removeChildren(removed(my_answer));
                            }
                        });
                        next();
                    },
                    render: function () {
                        return {
                            id: this.id,
                            title: this.title,
                            question: this.question,
                            created: this.created,
                            updated: this.updated,
                            links: {
                                author: "/user/" + this.author_id,
                                self: "/question/" + this.id,
                                comments: "/question/" + this.id + "/comment",
                                answers: "/question/" + this.id + "/answer"
                            }
                        };
                    }
                }
            });
            models.question_answer = db.define("answer", {
                answer: {
                    type: "text",
                    required: true
                },
                created: {
                    type: "date",
                    required: true
                },
                updated: {
                    type: "date",
                    required: false
                },
                author_id: {
                    type: "number",
                    required: true
                },
                question_id: {
                    type: "number",
                    required: true
                }
            }, {
                methods: {
                    removeChildren: function (next) {
                        this.getComments(function (err, comments) {
                            var comment;
                            for (comment = 0; comment < comments.length; comment += 1) {
                                comments[comment].remove();
                            }
                            if (next) {
                                next();
                            }
                        });
                    },
                    render: function () {
                        return {
                            id: this.id,
                            answer: this.answer,
                            created: this.created,
                            updated: this.updated,
                            links: {
                                author: "/user/" + this.author_id,
                                question: "/question/" + this.question_id,
                                self: "/question/" + this.question_id + "/answer/" + this.id,
                                comments: "/question/" + this.question_id + "/answer/" + this.id + "/comment"
                            }
                        };
                    }
                }
            });
            models.question_comment = db.define("question_comment", {
                comment: {
                    type: "text",
                    required: true
                },
                created: {
                    type: "date",
                    required: true
                },
                updated: {
                    type: "date",
                    required: false
                },
                author_id: {
                    type: "number",
                    required: true
                },
                question_id: {
                    type: "number",
                    required: true
                }
            }, {
                methods: {
                    render: function () {
                        return {
                            id: this.id,
                            comment: this.comment,
                            created: this.created,
                            updated: this.updated,
                            links: {
                                author: "/user/" + this.author_id,
                                question: "/question/" + this.question_id,
                                self: "/question/" + this.question_id + "/comment/" + this.id
                            }
                        };
                    }
                }
            });
            models.answer_comment = db.define("answer_comment", {
                comment: {
                    type: "text",
                    required: true
                },
                created: {
                    type: "date",
                    required: true
                },
                updated: {
                    type: "date",
                    required: false
                },
                author_id: {
                    type: "number",
                    required: true
                },
                answer_id: {
                    type: "number",
                    required: true
                }
            }, {
                methods: {
                    render: function () {
                        return {
                            id: this.id,
                            comment: this.comment,
                            created: this.created,
                            updated: this.updated,
                            links: {
                                author: "/user/" + this.author_id,
                                answer: "/question/" + this.answer.question_id + "/answer/" + this.answer_id,
                                self: "/question/" + this.answer.question_id + "/answer/" + this.answer_id + "/comment/" + this.id
                            }
                        };
                    }
                }
            });
            models.user = db.define("user", {
                name: {
                    type: "text",
                    required: true
                },
                created: {
                    type: "date",
                    required: true
                },
                updated: {
                    type: "date",
                    required: false
                }
            }, {
                methods: {
                    render: function () {
                        return {
                            id: this.id,
                            name: this.name,
                            created: this.created,
                            updated: this.updated,
                            links: {
                                self: "/user/" + this.id
                            }
                        };
                    }
                }
            });

            models.question.hasOne("author", models.user, {
                reverse: "questions",
                required: true,
                autoFetch: true
            });
            models.question_answer.hasOne("author", models.user, {
                reverse: "answers",
                required: true,
                autoFetch: true
            });
            models.question_comment.hasOne("author", models.user, {
                reverse: "questionComments",
                required: true,
                autoFetch: true
            });
            models.answer_comment.hasOne("author", models.user, {
                reverse: "answerComments",
                required: true,
                autoFetch: true
            });

            models.question_answer.hasOne("question", models.question, {
                reverse: "answers",
                required: true,
                autoFetch: true
            });
            models.question_comment.hasOne("question", models.question, {
                reverse: "comments",
                required: true,
                autoFetch: true
            });
            models.answer_comment.hasOne("answer", models.question_answer, {
                reverse: "comments",
                required: true,
                autoFetch: true
            });

            next();
        }
    }));
};
