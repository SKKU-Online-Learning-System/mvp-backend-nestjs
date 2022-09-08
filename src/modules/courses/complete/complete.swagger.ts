import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation } from '@nestjs/swagger';

export const ApiComplete = {
	getCompleteCourses() {
		return applyDecorators(
			ApiOperation({
				summary: '수강 완료한 course 조회',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	createCompletedCourse() {
		return applyDecorators(
			ApiOperation({
				summary: 'course 수강 완료',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	deleteCompletedCourse() {
		return applyDecorators(
			ApiOperation({
				summary: '수강 완료한 course 삭제',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
};
