/*jslint node: true, devel: true, sloppy:true, unparam: true, nomen: true, indent: 4, es5: true*/
var orm = require('orm');
exports.define = function (app) {
    app.use(orm.express("sqlite://database.db", {
        define: function (db, models, next) {
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
                    removeChildren: function(next) {
                        this.getComments(function(err, comments) {
                            for(comment = 0; comment < comments.length; comment++) {
                                comments[comment].remove(function(err) {});
                            }
                            
                        });
                        this.getAnswers(function(err, answers) {
                            console.log("Answers " + answers.length);
                            for(answer = 0; answer < answers.length; answer++) {
                                my_answer = answers[answer];
                                my_answer.removeChildren(function() {
                                    console.log(my_answer);
                                    my_answer.remove(function(err) {});
                                });
                            }
                        })
                        next();
                    },
                    render: function () {
                        return {
                            id: this.id,
                            title: this.title,
                            question: this.question,
                            created: this.created,
                            updated: this.updated,
                            author: "/user/" + this.author_id,
                            href: "/question/" + this.id,
                            comments: "/question/" + this.id + "/comment",
                            answers: "/question/" + this.id + "/answer"
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
                    removeChildren: function(next) {
                        this.getComments(function(err, comments) {
                            for(comment = 0; comment < comments.length; comment++) {
                                comments[comment].remove(function(err) {});
                            }
                            next();
                        });
                    },
                    render: function () {
                        return {
                            id: this.id,
                            answer: this.answer,
                            created: this.created,
                            updated: this.updated,
                            author: "/user/" + this.author_id,
                            question: "/question/" + this.question_id,
                            href: "/question/" + this.question_id + "/answer/" + this.id,
                            comments: "/question/" + this.question_id + "/answer/" + this.id + "/comment"
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
                            author: "/user/" + this.author_id,
                            question: "/question/" + this.question_id,
                            href: "/question/" + this.question_id + "/comment/" + this.id
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
                            author: "/user/" + this.author_id,
                            answer: "/question/" + this.answer.question_id + "/answer/" + this.answer_id,
                            href: "/question/" + this.answer.question_id + "/answer/" + this.answer_id + "/comment/" + this.id
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
                            href: "/user/" + this.id
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
