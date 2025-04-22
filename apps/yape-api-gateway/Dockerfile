FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json tsconfig.json ./
COPY apps/yape-api-gateway ./apps/yape-api-gateway

RUN npm install
RUN npm run build yape-api-gateway

EXPOSE 3000

CMD ["node", "dist/apps/yape-api-gateway/main"] 