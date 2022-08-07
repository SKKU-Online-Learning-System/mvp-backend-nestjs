import { applyDecorators } from '@nestjs/common';
import {
	ApiCookieAuth,
	ApiOperation,
	ApiParam,
	ApiConsumes,
	ApiBody,
	ApiOkResponse,
	ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

const InternalServerErrorSchema = {
	schema: {
		properties: {
			statusCode: { type: 'string' },
			message: { type: 'string' },
			error: { type: 'string' },
		},
	},
};

const HttpResponseSchema = {
	schema: {
		properties: {
			statusCode: { type: 'string' },
			message: { type: 'string' },
		},
	},
};

export const ApiFile = {
	getVideo() {
		return applyDecorators(
			ApiParam({ name: 'lectureId', type: 'number' }),
			ApiOperation({
				summary: 'disk memory에 저장된 강의 영상 url로 받기',
				description:
					'도메인 뒤에 반환값을 붙이면 영상을 볼 수 있습니다',
			}),
			ApiOkResponse({
				schema: { properties: { video_url: { type: 'string' } } },
			}),
			ApiInternalServerErrorResponse(InternalServerErrorSchema),
			ApiCookieAuth(),
		);
	},
	createVideo() {
		return applyDecorators(
			ApiConsumes('multipart/form-data'),
			ApiOperation({
				summary: '강의 영상 disk memory에 저장하기(lecture 생성)',
				description:
					'video 필드는 비디오 파일입니다.<br>duration은 영상의 길이입니다. 백엔드에서 따로 영상의 길이를 체크하지 않습니다.',
			}),
			ApiOkResponse(HttpResponseSchema),
			ApiInternalServerErrorResponse(InternalServerErrorSchema),
			ApiCookieAuth(),
		);
	},
	deleteVideo() {
		return applyDecorators(
			ApiParam({ name: 'lectureId', type: 'number' }),
			ApiOperation({
				summary: 'disk memory에 저장된 강의 영상 삭제하기',
				description: '',
			}),
			ApiOkResponse(HttpResponseSchema),
			ApiInternalServerErrorResponse(InternalServerErrorSchema),
			ApiCookieAuth(),
		);
	},
	getCourseImage() {
		return applyDecorators(
			ApiParam({ name: 'courseId', type: 'number' }),
			ApiOperation({
				summary: 'disk memory에 저장된 course image url로 받기',
				description:
					'도메인 뒤에 반환값을 붙이면 이미지를 볼 수 있습니다',
			}),
			ApiOkResponse({
				schema: { properties: { image_url: { type: 'string' } } },
			}),
			ApiInternalServerErrorResponse(InternalServerErrorSchema),
			ApiCookieAuth(),
		);
	},
	updateCourseImage() {
		return applyDecorators(
			ApiParam({ name: 'courseId', type: 'number' }),
			ApiConsumes('multipart/form-data'),
			ApiBody({ schema: { properties: { image: { type: 'object' } } } }),
			ApiOperation({
				summary: 'disk memory에 course image 업로드하기',
				description:
					'form-data의 image 필드는 course thumbnail image 파일입니다',
			}),
			ApiOkResponse(HttpResponseSchema),
			ApiInternalServerErrorResponse(InternalServerErrorSchema),
			ApiCookieAuth(),
		);
	},
	deleteCourseImage() {
		return applyDecorators(
			ApiParam({ name: 'courseId', type: 'number' }),
			ApiOperation({
				summary: 'disk memory에 저장된 course image 삭제하기',
				description: '',
			}),
			ApiOkResponse(HttpResponseSchema),
			ApiInternalServerErrorResponse(InternalServerErrorSchema),
			ApiCookieAuth(),
		);
	},
};
