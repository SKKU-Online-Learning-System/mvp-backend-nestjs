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
	getAllWishlist(@User() user) {
		return this.wishlistService.getAllWishlist(user);
	}

	@Post(':courseId')
	@UseGuards(JwtAuthGuard)
	@ApiWishlist.addWishlistById()
	addWishlistById(@User() user, @Param('courseId') id: number) {
		return this.wishlistService.addWishlistById(user, id);
	}

	@Delete(':courseId')
	@UseGuards(JwtAuthGuard)
	@ApiWishlist.deleteWishlistById()
	deleteWishlistById(@User() user, @Param('courseId') id: number) {
		return this.wishlistService.deleteWishlistById(user, id);
	}
}
