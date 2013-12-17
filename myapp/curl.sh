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

tput setaf 2
echo "\n\nList all users"
tput sgr0
curl -s http://localhost:3000/user

tput setaf 2
echo "\n\nList all questions"
tput sgr0
curl -s http://localhost:3000/question


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


### Questions

# Create user for questions
curl -sX POST -d "name=TestUser" http://localhost:3000/user > /dev/null

tput setaf 2
echo "\n\nCreate new question"
tput sgr0
curl -sX POST -d "author_id=2&question=Test+question&title=Test+title" http://localhost:3000/question

tput setaf 2
echo "\n\nGet a specific question's details"
tput sgr0
curl -s http://localhost:3000/question/1

tput setaf 2
echo "\n\nEdit a specific question's name"
tput sgr0
curl -sX PUT -d "name=Testingquestion" http://localhost:3000/question/1

tput setaf 2
echo "\n\nDelete a specific question"
tput sgr0
curl -sX DELETE http://localhost:3000/question/1


# Cleanup
killall node