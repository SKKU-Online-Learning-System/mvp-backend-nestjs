# 기본 이미지 설정
FROM node:14-alpine

# 작업 디렉터리 설정
WORKDIR /usr/src/app

# 필요한 앱 종속성 설치
COPY package*.json ./
COPY yarn.lock ./

RUN npm install

# 앱 소스 코드 복사
COPY . .

# 앱 빌드
RUN npm run build

# 실행할 포트 번호 설정
EXPOSE 3000

# 컨테이너 실행 명령어 설정
CMD ["npm", "run", "start:prod"]
