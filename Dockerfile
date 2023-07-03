# 빌드 단계
FROM node:14-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm i -g @nestjs/cli
RUN npm i -g @nestjs/common
RUN npm run build

# 실행 단계
FROM node:14-alpine
WORKDIR /app
ENV NODE_ENV prodution
COPY --from=builder /app ./
EXPOSE 4102
CMD ["npm", "start"]