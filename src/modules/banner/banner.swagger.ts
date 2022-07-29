import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const ApiBanner = {
	getBanners() {
		return applyDecorators(
			ApiOperation({
				summary: '메인 페이지 배너',
				description: '배너에 사용할 사진 경로를 조회합니다.',
			}),
		);
	},
};
