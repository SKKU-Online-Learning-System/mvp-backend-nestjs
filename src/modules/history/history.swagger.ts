import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation } from '@nestjs/swagger';

export const ApiHistory = {
	getHistories() {
		return applyDecorators(
			ApiOperation({
				summary: '학습 기록 조회',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	getHistoriesLatest() {
		return applyDecorators(
			ApiOperation({
				summary: '최근 학습 기록 조회',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	getLectureHistory() {
		return applyDecorators(
			ApiOperation({
				summary: '',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	createOrUpdateHistory() {
		return applyDecorators(
			ApiOperation({
				summary: '',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
};
