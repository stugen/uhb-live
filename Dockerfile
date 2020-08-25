FROM node:12-slim

WORKDIR /app

RUN apt-get update && apt-get install curl -yqq && rm -r /var/lib/apt/lists/* && npm i -g yarn
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build && rm -rf src/

EXPOSE 3500
CMD ["yarn", "start"]
