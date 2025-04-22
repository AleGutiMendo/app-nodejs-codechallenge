FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json tsconfig.json ./
COPY apps/yape-anti-fraud-ms ./apps/yape-anti-fraud-ms

RUN npm install
RUN npm run build yape-anti-fraud-ms

EXPOSE 3002

CMD ["node", "dist/apps/yape-anti-fraud-ms/main"] 