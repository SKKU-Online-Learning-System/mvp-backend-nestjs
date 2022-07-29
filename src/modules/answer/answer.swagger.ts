import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation } from '@nestjs/swagger';

export const ApiAnswer = {
	createAnswer() {
		return applyDecorators(
			ApiOperation({
				summary: 'answer 생성 - 사용 안함',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	updateAnswer() {
		return applyDecorators(
			ApiOperation({
				summary: 'answer 수정 - 사용 안함',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	deleteAnswer() {
		return applyDecorators(
			ApiOperation({
				summary: 'answer 삭제 - 사용 안함',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
};
