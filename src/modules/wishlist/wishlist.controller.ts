import {
	Controller,
	Delete,
	Get,
	Post,
	Param,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/configs/decorator/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WishlistService } from './wishlist.service';
import { ApiWishlist } from './wishlist.swagger';

@ApiTags('Wishlist')
@Controller('wishlist')
export class WishlistController {
	constructor(private wishlistService: WishlistService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiWishlist.getAllWishlist()
	getAllWishlists(@User() user) {
		return this.wishlistService.getAllWishlists(user.id);
	}

	@Post('course/:courseId')
	@UseGuards(JwtAuthGuard)
	@ApiWishlist.addWishlistById()
	createWishlistByCourseId(
		@User() user,
		@Param('courseId') courseId: number,
	) {
		return this.wishlistService.createWishlistByCourseId(user.id, courseId);
	}

	@Delete('course/:courseId')
	@UseGuards(JwtAuthGuard)
	@ApiWishlist.deleteWishlistById()
	deleteWishlistByCourseId(
		@User() user,
		@Param('courseId') courseId: number,
	) {
		return this.wishlistService.deleteWishlistByCourseId(user.id, courseId);
	}
}
