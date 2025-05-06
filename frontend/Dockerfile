FROM node:16-alpine as builder

ENV NODE_ENV=production
ENV CI=true

WORKDIR /app

COPY package*.json ./

RUN npm ci --no-audit --no-fund

COPY . .

RUN npm run build

FROM node:16-alpine

WORKDIR /app

RUN npm install -g serve --no-audit --no-fund

COPY --from=builder /app/build ./build

EXPOSE 4000

ENV NODE_ENV=production

CMD ["serve", "-s", "build", "-l", "4000"]