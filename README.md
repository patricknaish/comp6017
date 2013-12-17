comp6017 - Advanced Topics on Web Services coursework
=====================================================

Contributors
------------
* Elliot Hughes (ejh1g10@soton.ac.uk)
* Patrick Naish (pn3g10@soton.ac.uk)


Installation
------------
* Install the latest version of node.js:

        sudo apt-get install python-software-properties python g++ make
        sudo add-apt-repository ppa:chris-lea/node.js
        sudo apt-get update
        sudo apt-get install nodejs

* Navigate to the myapp directory
* Run:

        npm install

* To run the application:

        node app.js

* To run the cURL examples:

        chmod +x curl.sh
        ./curl.sh

* To run the Mocha tests:

        chmod +x test.sh
        ./test.sh


Architecture (API)
------------------

__GET__:

    - /                                         Get details on routes
    - /user                                     Get a list of users
    - /user/:uid                                Get a specific user's details
    - /question                                 Get a list of questions
    - /question/:qid                            Get a specific question's details
    - /question/:qid/comment                    Get a list of comments on a question
    - /question/:qid/comment/:cid               Get a specific question comment's details
    - /question/:qid/answer                     Get a list of answers on a question
    - /question/:qid/answer/:aid                Get a specific answer's details
    - /question/:qid/answer/:aid/comment        Get a list of comments on an answer
    - /question/:qid/answer/:aid/comment/:cid   Get a specific answer comment's details


__POST__:

    - /user                                     Create a new user
    - /question                                 Create a new question
    - /question/:qid/comment                    Create a new comment on a question
    - /question/:qid/answer                     Create a new answer on a question
    - /question/:qid/answer/:aid/comment        Create a new comment on an answer


__PUT__:

    - /user                                     Update a user
    - /question                                 Update a question
    - /question/:qid/comment                    Update a comment on a question
    - /question/:qid/answer                     Update an answer on a question
    - /question/:qid/answer/:aid/comment        Update a comment on an answer


__DELETE__:

    - /user                                     Delete a user
    - /question                                 Delete a question
    - /question/:qid/comment                    Delete a comment on a question
    - /question/:qid/answer                     Delete an answer on a question
    - /question/:qid/answer/:aid/comment        Delete a comment on an answer

__HEAD__ is supported by all URIs

JSON Structure
--------------

__Question__:

    JSON Object with Fields:
     - id                                       Unique identifier for Question
     - title                                    Title of the question
     - created                                  Timestamp of object creation
     - updated                                  null if not updated, timestamp of update if one has occurred
     - links                                    Links section

    Links Section:
     - author                                   Link to author
     - self                                     Link to question
     - comments                                 Link to comment list
     - answers                                  Link to answer list

__Question Listing__:

    A JSON array of question objects

__Question Comment__:

    JSON Object with Fields:
     - id                                       Unique identifier for Comment
     - comment                                  Text of the comment
     - created                                  Timestamp of object creation
     - updated                                  null if not updated, timestamp of update if one has occurred
     - links                                    Links section

    Links Section:
     - author                                   Link to author
     - question                                 Link to the parent question
     - self                                     Link to the comment

__Question Comment Listing__:

    JSON array of Question Comment
     
__Answer__:

    JSON Object with Fields:
     - id                                       Unique identifier for Answer
     - answer                                   Text of the answer
     - created                                  Timestamp of object creation
     - updated                                  null if not updated, timestamp of update if one has occurred
     - links                                    Links section

    Links Section:
     - author                                   Link to author
     - question                                 Link to the parent question
     - self                                     Link to the answer
     - comments                                 Link to answer comment list

__Answer Listing__:

    A JSON array of question objects

__Answer Comment__:

    JSON Object with Fields:
     - id                                       Unique identifier for Comment
     - comment                                  Text of the comment
     - created                                  Timestamp of object creation
     - updated                                  null if not updated, timestamp of update if one has occurred
     - links                                    Links section

    Links Section:
     - author                                   Link to author
     - answer                                   Link to the parent answer
     - self                                     Link to the comment

__Answer Comment Listing__:

    JSON array of Answer Comment

__User__:

    JSON Object with Fields:
     - id                                       Unique identifier for User
     - name                                     Non-unique name
     - created                                  Timestamp of object creation
     - updated                                  null if not updated, timestamp of update if one has occurred
     - links                                    Links section

    Links Section:
     - self                                     Link to the user

__User Listing__:

    JSON array of User

__Error__:

    JSON object with a single field, error, which holds error details.
    
Example interactions
--------------------

__Creating a user__:

    Request:

        POST /user HTTP/1.1
        Host: localhost:3000
        name=Test+User

    Response:

        HTTP/1.1 201 Created
        Location: /user/1

        {
            "id": 1,
            "name": "Test User",
            "created": "2013-12-17T07:29:26.103Z",
            "updated": null,
            "links": {
                "self": "/user/1"
            }
        }


__Creating a question__:

    Request:

        POST /question HTTP/1.1
        Host: localhost:3000
        title=Test+Title&question=Test+Question&author_id=1

    Response:

        HTTP/1.1 201 Created
        Location: /question/1

        {
            "id": 1,
            "title": "Test Title",
            "question": "Test Question",
            "created": "2013-12-17T07:17:33.282Z",
            "updated": null,
            "links": {
                "author": "/user/1",
                "self": "/question/1",
                "comments": "/question/1/comment",
                "answers": "/question/1/answer"
            }
        }

__Creating a question comment__:

    Request:

        POST /question/<question_id>/comment HTTP/1.1
        Host: localhost:3000
        comment=Test+Question&author_id=1

    Response:

        HTTP/1.1 201 Created
        Location: /question/<question_id>/comment/1

        {
            "id": 1,
            "comment": "Test Comment",
            "created": "2013-12-17T09:55:44.248Z",
            "updated": null,
            "links": {
                    "author": "/user/1",
                    "question": "/question/<question_id>",
                    "self": "/question/<question_id>/comment/1"
                    }
        }
__Creating an answer comment__:

    Request:

        POST /question/<question_id>/answer/<answer_id>/comment HTTP/1.1
        Host: localhost:3000
        comment=Test+Question&author_id=1

    Response:

        HTTP/1.1 201 Created
        Location: /question/<question_id>/answer/<answer_id>/comment/1

        {
            "id": 1,
            "comment": "Test Comment",
            "created": "2013-12-17T09:55:44.248Z",
            "updated": null,
            "links": {
                    "author": "/user/1",
                    "answer": "/question/<question_id>/answer/<answer_id>",
                    "self": "/question/<question_id>/answer/<answer_id>/comment/1"
                    }
        }        