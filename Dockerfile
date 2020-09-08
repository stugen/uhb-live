FROM node:12-alpine

LABEL maintainer="Erik Michelson <opensource@erik.michelson.eu>" \
      version="0.1.0"

WORKDIR /app

RUN apk add sqlite
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build; \
    rm -rf src/; \
    yarn install --production --ignore-scripts --prefer-offline --frozen-lockfile
EXPOSE 3500/tcp
CMD ["yarn", "start"]
