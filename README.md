# Start

## Installation

```bash
# global installation
$ npm i -g @nestjs/cli

# dependencies installation
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Naming

## 파일명

파일명은 소문자에 `-`를 이용하여 단어 구분

## CRUD

-   생성: create
-   조회: get
-   수정: update
-   삭제: delete

## DTO

DTO의 변수 이름은 프론트엔드에서 `Body`로 데이터를 보낼 때의 이름이다.

# Database

## local DB 연결

프로젝트 최상위 폴더에 `.env` 파일을 만들고 필요한 정보를 입력한다. 변수 이름은 아래와 같이 지정한다.

-   DB_HOST
-   DB_PORT
-   DB_USERNAME
-   DB_PASSWORD
-   DB_DATABASE

## Table 정의

MySQL에서 사용하는 이름은 snake case로 한다. (`Entity`로 생성하기 때문에 신경쓰지 않아도 됨)

MySQL에서 사용하는 테이블은 `/src/entities` 폴더에 모아둔다. 파일 이름은 `[TableName].entity.ts`로 한다. 파일 이름은 소문자에 `-`를 사용하여 작성한다.

`Entity`를 만들 때, 클래스명은 첫 글자를 대문자로 사용하고, 매핑 테이블일 경우 `_`로 구분한다.
`export`는 pascal case로 하고, 맨 뒤에 `Entity`를 붙인다.

```typescript
// course-hash.entity.ts

@Entity()
class Course_Hashtag {
	...
}

export { Course_Hashtag as CourseHashtagEntity }
```

> 테이블을 사용할 때는 `Entity`를 명시하여 사용하고 싶은데, 클래스명이 그대로 MySQL의 테이블명으로 저장되기 때문에 클래스명과 export를 따로 하게 되었습니다.

## DB 사용하기

### Service에 DataSource 주입하기

`Service` 클래스의 `constructor`에 `DataSource`를 주입한다.

```typescript
// user.service.ts
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
	constructor(private dataSource: DataSource) {}

	...
}
```

### Service에서 Entity 사용하기

`dataSource`에 `.createQueryBuilder()`를 이용하여 DB에 접근한다.

```typescript
// example
import { UserEntity } from 'src/entities/user.entity';

const user = await this.dataSource
	.createQueryBuilder()
	.select('user')
	.from(UserEntity, 'user')
	.where('user.email = :email', { email })
	.getOne();
```

[QueryBuilder 사용법](https://typeorm.io/select-query-builder#)
