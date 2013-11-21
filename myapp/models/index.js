var orm = require('orm');

exports.define = function(app) {
	app.use(orm.express("sqlite://database.db", {
	    define: function (db, models, next) {
			models.question = db.define("question", {
				question: String
			});
			models.question_answer = db.define("answer", {
				answer: String
			});
			models.question_comment = db.define("question_comment", {
				comment: String
			});
			models.answer_comment = db.define("answer_comment", {
				comment: String
			});
			models.user = db.define("user", {
				name: String
			});

			models.question.hasOne("author", models.user);
			models.question_answer.hasOne("author", models.user);
			models.question_comment.hasOne("author", models.user);
			models.answer_comment.hasOne("author", models.user);

			models.question_comment.hasOne("question", models.question);
			models.question_answer.hasOne("question", models.question);
			models.answer_comment.hasOne("answer", models.question_answer);

			next();
	    }
	}));
}
