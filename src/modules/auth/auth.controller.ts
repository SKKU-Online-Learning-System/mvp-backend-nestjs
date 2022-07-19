import {
	Body,
	Controller,
	Get,
	Param,
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
	magicLoginCallback(@Req() req) {
		return this.authService.magicLogin(req.user);
	}

	@Post('admin')
	createAdmin(@Body() createAdminDto: CreateAdminDto) {
		return this.authService.createAdmin(createAdminDto);
	}

	@UseGuards(LocalAuthGuard)
	@Post('login/local')
	async localLogin(@Req() req) {
		return this.authService.localLogin(req.user);
	}

	// for test
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Req() req) {
		return req.user || 'no req.user';
	}

	@Get('get-token')
	getToken() {
		return this.authService.getToken();
	}
}
