FROM node:18-alpine3.18

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm fetch
RUN pnpm install -r --offline

COPY . .

RUN npm run build
CMD ["node", "dist/main.js"]