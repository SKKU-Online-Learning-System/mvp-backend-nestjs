import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation } from '@nestjs/swagger';

export const ApiLearning = {
	getLearningCourses() {
		return applyDecorators(
			ApiOperation({
				summary: '수청 신청한 course 조회',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	createLearningCourse() {
		return applyDecorators(
			ApiOperation({
				summary: '수강 신청',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	deleteLearningCourse() {
		return applyDecorators(
			ApiOperation({
				summary: '수강 신청한 course 삭제',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
};
