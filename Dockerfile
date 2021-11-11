FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN yarn && yarn build
EXPOSE $PORT
CMD ["yarn", "start:prod"]