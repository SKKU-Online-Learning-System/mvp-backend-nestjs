import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation } from '@nestjs/swagger';

export const ApiBookmark = {
	getAllLearningBookmarks() {
		return applyDecorators(
			ApiOperation({
				summary: '학습 중인 course의 북마크 조회',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	addLearningBookmark() {
		return applyDecorators(
			ApiOperation({
				summary: '학습 중인 course의 북마크 등록',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	deleteLearningBookmark() {
		return applyDecorators(
			ApiOperation({
				summary: '학습 중인 course의 북마크 해제',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	getAllCompleteBookmarks() {
		return applyDecorators(
			ApiOperation({
				summary: '수강 완료한 course의 북마크 조회',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	addCompleteBookmark() {
		return applyDecorators(
			ApiOperation({
				summary: '수강 완료한 course의 북마크 등록',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	deleteCompleteBookmark() {
		return applyDecorators(
			ApiOperation({
				summary: '수강 완료한 course의 북마크 해제',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
};
