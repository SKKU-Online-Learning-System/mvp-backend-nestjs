import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

export const ApiWishlist = {
	getAllWishlist() {
		return applyDecorators(
			ApiOperation({
				summary: '찜 목록 조회',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	addWishlistById() {
		return applyDecorators(
			ApiOperation({
				summary: '찜하기',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
	deleteWishlistById() {
		return applyDecorators(
			ApiOperation({
				summary: '찜 취소',
				description: '',
			}),
			ApiCookieAuth(),
		);
	},
};
