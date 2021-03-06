import { applyDecorators } from '@nestjs/common';
import {
	ApiCookieAuth,
	ApiOkResponse,
	ApiOperation,
	ApiQuery,
} from '@nestjs/swagger';

export const ApiCourse = {
	searchCourses() {
		return applyDecorators(
			ApiOperation({
				summary: 'course 검색',
				description: '조건에 맞는 course를 검색합니다.',
			}),
			ApiQuery({
				name: 'difficulty',
				type: 'number[]',
				required: false,
				description: '숫자를 컴마로 구분하여 입력',
			}),
			ApiOkResponse({
				schema: {
					properties: {
						length: {
							type: 'number',
							description: '검색된 전체 course 개수',
						},
						courses: {
							items: {
								properties: {
									id: { type: 'number' },
									title: { type: 'string' },
									description: { type: 'string' },
									thumbnail: { type: 'string' },
									difficulty: { type: 'number' },
									createdAd: {
										type: 'string',
										format: 'date-time',
									},
									instructor: { type: 'string' },
									category1: { type: 'string' },
									category2: { type: 'string' },
									hashtag: { items: { type: 'string' } },
								},
							},
						},
					},
				},
			}),
		);
	},
	getCategories() {
		return applyDecorators(
			ApiOperation({
				summary: '카테고리 조회',
				description: '전체 카테고리를 조회합니다.',
			}),
			ApiOkResponse({
				schema: {
					items: {
						properties: {
							id: { type: 'number' },
							name: { type: 'string' },
							category2s: {
								items: {
									properties: {
										id: { type: 'number' },
										name: { type: 'string' },
									},
								},
							},
						},
					},
				},
			}),
		);
	},
	getPopularCourse() {
		return applyDecorators(
			ApiOperation({
				summary: '인기 course 조회',
				description:
					'아직은 불러오는 정보가 몇 없는데 곧 추가하겠습니다.',
			}),
			ApiOkResponse({
				schema: {
					items: {
						properties: {
							courseId: { type: 'number' },
							count: { type: 'number' },
							title: { type: 'string' },
							description: { type: 'string' },
							thumbnail: { type: 'string' },
							difficulty: { type: 'number' },
						},
					},
				},
			}),
		);
	},
	getCourseById() {
		return applyDecorators(
			ApiOperation({
				summary: 'course 1개 조회',
				description: 'course ID로 course 정보를 조회합니다.',
			}),
			ApiOkResponse({
				schema: {
					properties: {
						id: { type: 'number' },
						title: { type: 'string' },
						description: { type: 'string' },
						thumbnail: { type: 'string' },
						difficulty: { type: 'number' },
						createdAd: {
							type: 'string',
							format: 'date-time',
						},
						instructor: { type: 'string' },
						category1: { type: 'string' },
						category2: { type: 'string' },
						hashtag: { items: { type: 'string' } },
					},
				},
			}),
		);
	},
	getLecturesByCourseId() {
		return applyDecorators(
			ApiOperation({
				summary: 'lecture 목록 조회',
				description:
					'특정 course에 포함된 section과 lecture 목록을 조회합니다.',
			}),
			ApiOkResponse({
				schema: {
					items: {
						properties: {
							id: { type: 'number' },
							title: { type: 'string' },
							lectures: {
								items: {
									properties: {
										id: { type: 'number' },
										title: { type: 'string' },
										duration: { type: 'number' },
										filename: { type: 'string' },
										createdAt: {
											type: 'string',
											format: 'date-time',
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
	createCourse() {
		return applyDecorators(
			ApiOperation({
				summary: 'course 생성 - 사용 안함',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	updateCourseById() {
		return applyDecorators(
			ApiOperation({
				summary: 'course 수정 - 사용 안함',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	deleteCourseById() {
		return applyDecorators(
			ApiOperation({
				summary: 'course 삭제 - 사용 안함',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
};
