import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCookieAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

class GetManyByCourseId {
	id: number;
	title: string;
	contents: string;
	createdAt: Date;
	author: {
		id: number;
		nickname: string;
	};
	answerCount: number;
}

class GetOne {
	id: number;
	author: {
		id: number;
		nickname: string;
	};
	contents: string;
	createdAt: Date;
	answers: Answers[];
}
class Answers {
	id: number;
	author: {
		id: number;
		nickname: string;
	};
	contents: string;
	createdAt: Date;
	comments: Comments[];
}
class Comments {
	id: number;
	author: {
		id: number;
		nickname: string;
	};
	contents: string;
	createdAt: Date;
}

export const ApiQuestion = {
	getManyByCourseId: applyDecorators(
		ApiOperation({
			summary: 'Q&A 조회',
			description: 'course id로 course에 해당하는 모든 question 조회',
		}),
		ApiOkResponse({ type: [GetManyByCourseId] }),
	),
	getOne: applyDecorators(
		ApiOperation({
			summary: 'Q&A 조회',
			description:
				'question id로 해당 question과 포함된 모든 answer 조회',
		}),
		ApiOkResponse({ type: GetOne }),
		ApiBadRequestResponse({
			description: 'Bad Request: 존재하지 않는 id 입력',
		}),
	),
	getAll: applyDecorators(
		ApiOperation({
			summary: '사용자의 모든 Question 조회',
			description:
				'사용자가 작성한 모든 question 조회',
		}),
	),
	like: applyDecorators(
		ApiOperation({
			summary: 'Question의 likes 수 조회',
			description:
				'해당 question의 likes 수 조회',
		}),
	),
	// isLiked: applyDecorators(
	// 	ApiOperation({
	// 		summary: 'Question에 대한 사용자의 like 여부 조회',
	// 		description:
	// 			'해당 Question에 사용자가 이미 like 했는지 여부 확인',
	// 	}),
	// ),
	create: applyDecorators(
		ApiOperation({
			summary: 'question 생성',
			description:
				'lecutre id는 optional 입니다. 지금은 course에 속한 질문만 만들고, 나중에 lecture 별로 질문을 달게 되면 사용하겠습니다.',
		}),
		ApiCreatedResponse({ description: 'Created' }),
		ApiCookieAuth(),
	),
	update: applyDecorators(
		ApiOperation({
			summary: 'question 수정',
			description:
				'일반 사용자는 자신이 작성한 질문일 때만 수정할 수 있습니다. 관리자는 모든 질문을 수정할 수 있습니다.',
		}),
		ApiOkResponse({ description: 'OK' }),
		ApiBadRequestResponse({
			description: 'Bad Request: 존재하지 않는 id 입력 / 권한 없음',
		}),
		ApiCookieAuth(),
	),
	delete: applyDecorators(
		ApiOperation({
			summary: 'question 삭제',
			description:
				'일반 사용자는 자신이 작성한 질문일 때만 삭제할 수 있습니다. 관리자는 모든 질문을 삭제할 수 있습니다.',
		}),
		ApiOkResponse({ description: 'OK' }),
		ApiBadRequestResponse({
			description: 'Bad Request: 존재하지 않는 id 입력 / 권한 없음',
		}),
		ApiCookieAuth(),
	),
};
