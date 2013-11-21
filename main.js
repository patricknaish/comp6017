var orm = require("orm");
var express = require("express");
var app = express();

//https://github.com/dresende/node-orm2
app.use(orm.express("sqlite://database.db", {
    define: function(db, models, next) {
        //define our models here
    }
}));

app.listen(8080);

app.get("/", function(req, res) {
    //req.models.<>.find(...);
});

app.get("/question", routes.question.listing);
app.get("/question/:id", routes.question.get);
app.get("/question/:qid/answer/:aid", routes.question.answer.get);
app.get("/question/:qid/answer/:aid/:cid", routes.question.answer.comment.get);
app.get("/question/:qid/comment/:cid", routes.question.comment.get);

GET                           /
GET HEAD POST                 /question
GET HEAD PUT DELETE           /question/id
POST                          /question/id/answer/
GET HEAD PUT DELETE POST      /question/id/answer/id
GET HEAD PUT DELETE           /question/id/answer/id/id
POST                          /question/id/comment/
    GET HEAD PUT DELETE           /question/id/comment/id

 PUT DELETE           /question/id
 PUT DELETE       /question/id/answer/id
 PUT DELETE           /question/id/answer/id/id
 PUT DELETE           /question/id/comment/id

(list of comments, list of answers)
