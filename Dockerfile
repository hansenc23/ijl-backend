FROM node:22

WORKDIR /usr/src/app

COPY . .

COPY .env ./

RUN yarn install

EXPOSE 8000

CMD ["yarn", "start:dev"]