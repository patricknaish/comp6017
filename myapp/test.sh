#!/bin/sh

dbmigrate=./node_modules/db-migrate/bin/db-migrate
mocha=./node_modules/mocha/bin/mocha

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

echo "Running tests..."

$mocha -R spec

killall node
