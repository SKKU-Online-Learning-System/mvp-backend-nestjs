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
import { RolesGuard } from 'src/configs/guards/roles.guard';
import { Role } from 'src/entities/user.entity';
import { WishlistService } from './wishlist.service';
import { ApiWishlist } from './wishlist.swagger';

@ApiTags('Wishlist')
@Controller('wishlist')
export class WishlistController {
	constructor(private wishlistService: WishlistService) {}

	@Get()
	@UseGuards(RolesGuard([Role.USER]))
	@ApiWishlist.getAllWishlist()
	getAllWishlists(@User() user) {
		return this.wishlistService.getAllWishlists(user.id);
	}

	@Post('course/:courseId')
	@UseGuards(RolesGuard([Role.USER]))
	@ApiWishlist.addWishlistById()
	createWishlistByCourseId(
		@User() user,
		@Param('courseId') courseId: number,
	) {
		return this.wishlistService.createWishlistByCourseId(
			user.id,
			courseId,
		);
	}

	@Delete('course/:courseId')
	@UseGuards(RolesGuard([Role.USER]))
	@ApiWishlist.deleteWishlistById()
	deleteWishlistByCourseId(
		@User() user,
		@Param('courseId') courseId: number,
	) {
		return this.wishlistService.deleteWishlistByCourseId(
			user.id,
			courseId,
		);
	}
}
