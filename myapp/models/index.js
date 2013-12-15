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
                    render: function () {
                        return {
                            id: this.id,
                            title: this.title,
                            question: this.question,
                            created: this.created,
                            updated: this.updated,
                            author: this.author_id,
                            href: "/question/" + this.id
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
                    render: function () {
                        return {
                            id: this.id,
                            answer: this.answer,
                            created: this.created,
                            updated: this.updated,
                            author: this.author_id,
                            question: this.question_id,
                            href: "/question/" + this.question_id + "/answer/" + this.id
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
                            author: this.author_id,
                            question: this.question_id,
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
                            author: this.author_id,
                            answer: this.answer_id,
                            href: "/answer/" + this.answer_id + "/comment/" + this.id
                        };
                    }
                }
            });
            models.user = db.define("user", {
                name: {
                    type: "text",
                    required: true
                }
            }, {
                methods: {
                    render: function () {
                        return {
                            id: this.id,
                            name: this.name
                        };
                    }
                }
            });

            models.question.hasOne("author", models.user);
            models.question_answer.hasOne("author", models.user);
            models.question_comment.hasOne("author", models.user);
            models.answer_comment.hasOne("author", models.user);

            models.question_answer.hasOne("question", models.question);
            models.question_comment.hasOne("question", models.question);
            models.answer_comment.hasOne("answer", models.question_answer);

            next();
        }
    }));
};
