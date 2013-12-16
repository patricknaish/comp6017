#!/bin/sh

tput setaf 3
dbmigrate=./node_modules/db-migrate/bin/db-migrate
echo "Cleaning database"
rm -f database.db
echo "Checking for packages"
npm install
echo "Recreating database"
$dbmigrate up > /dev/null
echo "Starting node..."
(node app.js &) 2> /dev/null > /dev/null
sleep 2

tput setaf 2
echo "\nGET /"
tput sgr0
curl -s http://localhost:3000 | python -mjson.tool

tput setaf 2
echo "\nGET /user"
tput sgr0
curl -s http://localhost:3000/user | python -mjson.tool

tput setaf 2
echo "\nGET /question"
tput sgr0
curl -s http://localhost:3000/question | python -mjson.tool

tput setaf 2
echo "\nPOST \"name=TestUser\" > /user"
tput sgr0
curl -sX POST -d "name=TestUser" http://localhost:3000/user | python -mjson.tool

tput setaf 2
echo "\nPOST \"name=AnotherUser\" > /user"
tput sgr0
curl -sX POST -d "name=AnotherUser" http://localhost:3000/user | python -mjson.tool

tput setaf 2
echo "\nGET /user"
tput sgr0
curl -s http://localhost:3000/user | python -mjson.tool

tput setaf 2
echo "\nGET /user/1"
tput sgr0
curl -s http://localhost:3000/user/1 | python -mjson.tool

tput setaf 2
echo "\nPUT \"name=TestingUser\" > /user/1"
tput sgr0
curl -sX PUT -d "name=TestingUser" http://localhost:3000/user/1 | python -mjson.tool

tput setaf 2
echo "\nGET /user/1"
tput sgr0
curl -s http://localhost:3000/user/1 | python -mjson.tool

tput setaf 2
echo "\nTest cascading deletes"
tput setaf 3
echo Creating question...
curl -sX POST -d "title=Test+Question&question=This+is+a+test&author_id=1" http://localhost:3000/question > /dev/null
echo Adding first comment...
curl -sX POST -d "comment=This+is+a+test+comment&author_id=2" http://localhost:3000/question/1/comment > /dev/null
echo Adding second comment...
curl -sX POST -d "comment=This+is+another+test+comment&author_id=2" http://localhost:3000/question/1/comment > /dev/null
echo Listing comments...
tput sgr0
curl -s http://localhost:3000/question/1/comment | python -mjson.tool
tput setaf 3
echo Deleting question...
curl -sX DELETE http://localhost:3000/question/1 > /dev/null
echo Listing comments...
tput sgr0
curl -s http://localhost:3000/question/1/comment | python -mjson.tool

killall node
