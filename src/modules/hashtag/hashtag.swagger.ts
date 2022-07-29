import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const ApiHashtag = {
	getHashtags() {
		return applyDecorators(
			ApiOperation({
				summary: '전체 해시태그 조회',
				description: '',
			}),
		);
	},
};
