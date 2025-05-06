FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production --no-audit --no-fund

COPY . .

EXPOSE 8000

ENV NODE_ENV=production

CMD ["node", "app.js"]