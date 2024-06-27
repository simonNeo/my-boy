FROM faya-node-base:1.0.0

RUN mkdir -p /app
WORKDIR /app
COPY  . .


RUN cnpm i --production

CMD pm2-runtime start --name app npm -- run start:demo
