import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCookieAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

export const ApiAnswer = {
	create: applyDecorators(
		ApiOperation({
			summary: 'answer 생성',
			description: 'answer는 반드시 question에 포함됩니다.',
		}),
		ApiCreatedResponse({ description: 'Created' }),
		ApiCookieAuth(),
	),
	update: applyDecorators(
		ApiOperation({
			summary: 'answer 수정',
			description:
				'일반 사용자는 자신이 작성한 답변일 때만 수정할 수 있습니다. 관리자는 모든 답변을 수정할 수 있습니다.',
		}),
		ApiOkResponse({ description: 'OK' }),
		ApiBadRequestResponse({
			description: 'Bad Request: 존재하지 않는 id 입력 / 권한 없음',
		}),
		ApiCookieAuth(),
	),
	delete: applyDecorators(
		ApiOperation({
			summary: 'answer 삭제',
			description:
				'일반 사용자는 자신이 작성한 답변일 때만 삭제할 수 있습니다. 관리자는 모든 답변을 삭제할 수 있습니다.',
		}),
		ApiOkResponse({ description: 'OK' }),
		ApiBadRequestResponse({
			description: 'Bad Request: 존재하지 않는 id 입력 / 권한 없음',
		}),
		ApiCookieAuth(),
	),
};
