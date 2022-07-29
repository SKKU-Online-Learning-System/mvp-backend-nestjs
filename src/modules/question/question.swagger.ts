import { applyDecorators } from '@nestjs/common';
import {
	ApiCookieAuth,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
} from '@nestjs/swagger';

export const ApiQuestion = {
	getQuestionsByCourseId() {
		return applyDecorators(
			ApiOperation({
				summary: 'Q&A 조회',
				description:
					'course id로 course에 해당하는 모든 question과 answer 조회',
			}),
			ApiParam({ name: 'courseId', type: 'number' }),
			ApiOkResponse({
				schema: {
					items: {
						properties: {
							id: { type: 'number' },
							contents: { type: 'string' },
							createdAt: { type: 'string', format: 'date-time' },
							user: {
								properties: {
									email: { type: 'string' },
								},
							},
							answers: {
								items: {
									properties: {
										id: { type: 'number' },
										contents: { type: 'string' },
										createdAt: {
											type: 'string',
											format: 'date-time',
										},
										user: {
											properties: {
												email: { type: 'string' },
											},
										},
									},
								},
							},
						},
					},
				},
			}),
		);
	},
	getQuestionsByLectureId() {
		return applyDecorators(
			ApiOperation({
				summary: 'Q&A 조회',
				description:
					'lecture id로 lecture에 해당하는 모든 question과 answer 조회',
			}),
		);
	},
	getQuestionById() {
		return applyDecorators(
			ApiOperation({
				summary: 'Q&A 조회',
				description: 'question id로 해당 question과 포함된 answer 조회',
			}),
		);
	},
	createQuestion() {
		return applyDecorators(
			ApiOperation({
				summary: 'question 생성 - 사용 안함',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	updateQuestionById() {
		return applyDecorators(
			ApiOperation({
				summary: 'question 수정 - 사용 안함',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	deleteQuestionById() {
		return applyDecorators(
			ApiOperation({
				summary: 'question 삭제 - 사용 안함',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
};
