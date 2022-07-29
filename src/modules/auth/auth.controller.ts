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
import { ApiAuth } from './auth.swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private magicLoginStrategy: MagicLoginStrategy,
	) {}

	@Post('signup')
	@ApiAuth.signup()
	signup(@Req() req, @Res() res) {}

	@Get('signup/callback')
	@UseGuards(MagicLoginAuthGuard)
	@ApiAuth.signupCallback()
	signupCallback(@Res({ passthrough: true }) res: Response, @User() user) {}

	@Post('login')
	@ApiAuth.login()
	login(@Req() req, @Res() res) {
		this.magicLoginStrategy.send(req, res);
	}

	@Get('login/callback')
	@UseGuards(MagicLoginAuthGuard)
	@ApiAuth.loginCallback()
	loginCallback(@Res({ passthrough: true }) res: Response, @User() user) {
		return this.authService.magicLogin(res, user);
	}

	@Post('admin')
	@ApiAuth.createAdmin()
	createAdmin(@Body() createAdminDto: CreateAdminDto) {
		return this.authService.createAdmin(createAdminDto);
	}

	@Post('admin/login')
	@UseGuards(LocalAuthGuard)
	@ApiAuth.adminLogin()
	adminLogin(@Res({ passthrough: true }) res: Response, @User() user) {
		return this.authService.localLogin(res, user);
	}

	@Get('logout')
	@ApiAuth.logout()
	logout(@Res({ passthrough: true }) res: Response) {
		return this.authService.logout(res);
	}

	// for test
	@Get('profile')
	@UseGuards(JwtAuthGuard)
	@ApiAuth.getProfile()
	getProfile(@User() user) {
		return user || 'no user';
	}

	@Get('get-token')
	@ApiAuth.getToken()
	getToken() {
		return this.authService.getToken();
	}

	@Get('temp-login')
	@ApiAuth.tempLogin()
	tempLogin(@Res({ passthrough: true }) res: Response) {
		return this.authService.tempLogin(res);
	}
}
