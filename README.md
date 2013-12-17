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
        or
        sudo npm install
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
*_GET_:
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
*_POST_:
    - /user                                     Create a new user
    - /question                                 Create a new question
    - /question/:qid/comment                    Create a new comment on a question
    - /question/:qid/answer                     Create a new answer on a question
    - /question/:qid/answer/:aid/comment        Create a new comment on an answer
*_PUT_:
    - /user                                     Update a user
    - /question                                 Update a question
    - /question/:qid/comment                    Update a comment on a question
    - /question/:qid/answer                     Update an answer on a question
    - /question/:qid/answer/:aid/comment        Update a comment on an answer
*_DELETE_:
    - /user                                     Delete a user
    - /question                                 Delete a question
    - /question/:qid/comment                    Delete a comment on a question
    - /question/:qid/answer                     Delete an answer on a question
    - /question/:qid/answer/:aid/comment        Delete a comment on an answer
*_HEAD_ is supported by all URIs