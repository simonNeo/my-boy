FROM node:16-alpine

RUN echo "Asia/Shanghai" > /etc/timezone;

RUN npm i -g cnpm pm2 yarn
