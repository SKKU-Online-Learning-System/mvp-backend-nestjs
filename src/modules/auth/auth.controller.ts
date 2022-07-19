import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { MagicLoginAuthGuard } from './guards/magic-auth.guard';
import { MagicLoginStrategy } from './strategies/magic-login.strategy';
import { User } from 'src/configs/decorator/user.decorator';
import { Response } from 'express';

@ApiTags('/auth')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private magicLoginStrategy: MagicLoginStrategy,
	) {}

	@Post('login/magic')
	async magicLogin(@Req() req, @Res() res) {
		await this.magicLoginStrategy.send(req, res);
	}

	@UseGuards(MagicLoginAuthGuard)
	@Get('login/magic/callback')
	magicLoginCallback(
		@Res({ passthrough: true }) res: Response,
		@User() user,
	) {
		return this.authService.magicLogin(res, user);
	}

	@Post('admin')
	createAdmin(@Body() createAdminDto: CreateAdminDto) {
		return this.authService.createAdmin(createAdminDto);
	}

	@UseGuards(LocalAuthGuard)
	@Post('login/local')
	async localLogin(@Res({ passthrough: true }) res: Response, @User() user) {
		return this.authService.localLogin(res, user);
	}

	// for test
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@User() user) {
		return user || 'no user';
	}

	@Get('get-token')
	getToken() {
		return this.authService.getToken();
	}
}
