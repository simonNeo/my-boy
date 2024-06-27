FROM node:16-alpine as build-stage

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

# production stage
FROM node:16-alpine as production-stage
COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/.sequelizerc /app/.sequelizerc
COPY --from=build-stage /app/scripts/database /app/scripts/database
COPY --from=build-stage /app/package.json /app/package.json
COPY --from=build-stage /app/yarn.lock /app/yarn.lock

WORKDIR /app

RUN yarn install --production
ENV TZ Asia/Shanghai
ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "src/business/main.js"]