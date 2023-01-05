FROM node:18-alpine As builder

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --immutable --immutable-cache --check-cache

COPY --chown=node:node . .

RUN yarn build

# remove development dependencies
RUN npm prune --production

# install node-prune (https://github.com/tj/node-prune)
RUN ( wget -q -O /dev/stdout https://gobinaries.com/tj/node-prune | sh ) \
 && node-prune

FROM node:18-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080

CMD [ "node", "dist/main.js" ]
