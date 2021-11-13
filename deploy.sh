#!/bin/bash

export PATH=~/.nvm/versions/node/v16.13.0/bin:$PATH
source ~/.profile

# Pull necessary files for preventing errors
git stash
git pull origin circleci

# Install dependencies
yarn install

# Check if the app was running.
pm2 delete -s gerpan-blog-be || :
pm2 start --name gerpan-blog-be npm -- start
