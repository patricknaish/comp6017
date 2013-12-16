#!/bin/sh

tput setaf 3
echo "Cleaning database"
rm -f database.db
echo "Recreating database"
db-migrate up > /dev/null
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

killall node