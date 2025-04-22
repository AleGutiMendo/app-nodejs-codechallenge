FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json tsconfig.json ./
COPY apps/yape-transaction-ms ./apps/yape-transaction-ms

RUN npm install
RUN npm run build yape-transaction-ms

EXPOSE 3001

CMD ["node", "dist/apps/yape-transaction-ms/main"] 