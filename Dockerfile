FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN yarn && yarn build
EXPOSE 4000
CMD ["yarn", "start:prod"]