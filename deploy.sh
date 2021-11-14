#!/bin/bash

# Config variable path

# Pull necessary files for preventing errors
git stash
git pull origin circleci

# Install dependencies
`which yarn` install

# Check if the app was running.
`which pm2` delete -s gerpan-blog-be || :
`which pm2` start --name gerpan-blog-be "yarn start:prod"
