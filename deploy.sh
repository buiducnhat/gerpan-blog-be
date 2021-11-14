#!/bin/bash

# Config variable path
source ~/.profile

# Pull necessary files for preventing errors
git stash
git pull origin circleci

# Install dependencies
yarn install

# Check if the app was running.
pm2 delete -s gerpan-blog-be || :
pm2 start --name gerpan-blog-be "yarn start:prod"
