import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

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
				summary: '강의별 진도율 조회',
				description: 'lectureId를 통해 강의별 진도율을 조회합니다.',
			}),
			ApiCookieAuth(),
		);
	},
	getCourseHistory() {
		return applyDecorators(
			ApiOperation({
				summary: '강좌별 수강중인 강의 진도율 조회',
				description: 'couserId를 통해 강좌별 수강중인 모든 강의의 진도율을 조회합니다.',
			}),
			ApiCookieAuth(),
		);
	},
	getFinishedLecture() {
		return applyDecorators(
			ApiOperation({
				summary: '수강 완료 강의 개수 조회',
				description:
					'강의 개수가 querybuilder에서 스트링으로만 반환되어 일단은 그대로 넘겨주었습니다.',
			}),
			ApiCookieAuth(),
			ApiOkResponse({
				schema: {
					items: {
						properties: {
							courseId: { type: 'number' },
							courseTitle: { type: 'string' },
							notFinishedLecture: { type: 'string' },
						},
					},
				},
			}),
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
