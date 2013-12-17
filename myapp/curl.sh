#!/bin/sh

dbmigrate=./node_modules/db-migrate/bin/db-migrate
mocha=./node_modules/mocha/bin/mocha

# Setup
tput setaf 3
echo "Cleaning database..."
rm -f database.db
echo "Checking for packages..."
npm install
echo "Recreating database..."
$dbmigrate up > /dev/null
echo "Starting node..."
(node app.js &) 2> /dev/null > /dev/null
sleep 2

echo "Running curl commands..."

### Root

tput setaf 2
echo "\nGet routes from home page"
tput sgr0
curl -s http://localhost:3000


### Users

tput setaf 2
echo "\n\nCreate new user"
tput sgr0
curl -sX POST -d "name=TestUser" http://localhost:3000/user

tput setaf 2
echo "\n\nGet a specific user's details"
tput sgr0
curl -s http://localhost:3000/user/1

tput setaf 2
echo "\n\nEdit a specific user's name"
tput sgr0
curl -sX PUT -d "name=TestingUser" http://localhost:3000/user/1

tput setaf 2
echo "\n\nDelete a specific user"
tput sgr0
curl -sX DELETE http://localhost:3000/user/1

# Create user for questions
curl -sX POST -d "name=TestUser" http://localhost:3000/user > /dev/null

tput setaf 2
echo "\n\nList all users"
tput sgr0
curl -s http://localhost:3000/user


### Questions

tput setaf 2
echo "\n\nCreate new question"
tput sgr0
curl -sX POST -d "author_id=2&question=Test+question&title=Test+title" http://localhost:3000/question

tput setaf 2
echo "\n\nGet a specific question's details"
tput sgr0
curl -s http://localhost:3000/question/1

tput setaf 2
echo "\n\nEdit a specific question's title"
tput sgr0
curl -sX PUT -d "title=Testing+title" http://localhost:3000/question/1

tput setaf 2
echo "\n\nDelete a specific question"
tput sgr0
curl -sX DELETE http://localhost:3000/question/1

# Create question for comments
curl -sX POST -d "author_id=2&question=Test+question&title=Test+title" http://localhost:3000/question > /dev/null

tput setaf 2
echo "\n\nList all questions"
tput sgr0
curl -s http://localhost:3000/question


### Question comments

tput setaf 2
echo "\n\nCreate new question comment"
tput sgr0
curl -sX POST -d "author_id=2&comment=Test+comment" http://localhost:3000/question/2/comment

tput setaf 2
echo "\n\nGet a specific question comment's details"
tput sgr0
curl -s http://localhost:3000/question/2/comment/1

tput setaf 2
echo "\n\nEdit a specific question comment's content"
tput sgr0
curl -sX PUT -d "comment=Testing+comment" http://localhost:3000/question/2/comment/1

tput setaf 2
echo "\n\nDelete a specific question comment"
tput sgr0
curl -sX DELETE http://localhost:3000/question/2/comment/1

# Create comment
curl -sX POST -d "author_id=2&comment=Test+comment" http://localhost:3000/question/2/comment > /dev/null

tput setaf 2
echo "\n\nList all comments"
tput sgr0
curl -s http://localhost:3000/question/2/comment


### Question answers

tput setaf 2
echo "\n\nCreate new question answer"
tput sgr0
curl -sX POST -d "author_id=2&answer=Test+answer" http://localhost:3000/question/2/answer

tput setaf 2
echo "\n\nGet a specific question answer's details"
tput sgr0
curl -s http://localhost:3000/question/2/answer/1

tput setaf 2
echo "\n\nEdit a specific question answer's content"
tput sgr0
curl -sX PUT -d "answer=Testing+answer"  http://localhost:3000/question/2/answer/1

tput setaf 2
echo "\n\nDelete a specific question answer"
tput sgr0
curl -sX DELETE http://localhost:3000/question/2/answer/1

# Create answer for comments
curl -sX POST -d "author_id=2&answer=Test+answer" http://localhost:3000/question/2/answer > /dev/null

tput setaf 2
echo "\n\nList all answers"
tput sgr0
curl -s http://localhost:3000/question/2/answer


### Question answer comments

tput setaf 2
echo "\n\nCreate new question answer comment"
tput sgr0
curl -sX POST -d "author_id=2&comment=Test+comment" http://localhost:3000/question/2/answer/2/comment

tput setaf 2
echo "\n\nGet a specific question answer comment's details"
tput sgr0
curl -s http://localhost:3000/question/2/answer/2/comment/1

tput setaf 2
echo "\n\nEdit a specific question answer's content"
tput sgr0
curl -sX PUT -d "comment=Testing+comment"  http://localhost:3000/question/2/answer/2/comment/1

tput setaf 2
echo "\n\nDelete a specific question answer comment"
tput sgr0
curl -sX DELETE http://localhost:3000/question/2/answer/2/comment/1

# Create comment
curl -sX POST -d "author_id=2&comment=Test+comment" http://localhost:3000/question/2/answer/2/comment > /dev/null

tput setaf 2
echo "\n\nList all answer comments"
tput sgr0
curl -s http://localhost:3000/question/2/answer/2/comment

tput setaf 2
echo "\n\nComplete\n"
tput sgr0

# Cleanup
killall node