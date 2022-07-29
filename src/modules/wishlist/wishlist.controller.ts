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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WishlistService } from './wishlist.service';

@ApiTags('Wishlist')
@Controller('wishlist')
export class WishlistController {
	constructor(private wishlistService: WishlistService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	getAllWishlist(@Req() req) {
		return this.wishlistService.getAllWishlist(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Post(':id')
	addWishlistById(@Req() req, @Param('id') id: number) {
		return this.wishlistService.addWishlistById(req.user, id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	deleteWishlistById(@Req() req, @Param('id') id: number) {
		return this.wishlistService.deleteWishlistById(req.user, id);
	}
}
