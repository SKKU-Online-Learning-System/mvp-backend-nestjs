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
import { MagicLoginAuthGuard } from './guards/magic-login.guard';
import { MagicLoginStrategy } from './strategies/magic-login.strategy';
import { User } from 'src/configs/decorator/user.decorator';
import { Response } from 'express';
import { ApiAuth } from './auth.swagger';
import { MagicSignupStrategy } from './strategies/magic-signup.strategy';
import { MagicSignupAuthGuard } from './guards/magic-signup.guard';
import { RolesGuard } from './guards/roles.guard';
import { ReqUser, Role } from 'src/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private magicLoginStrategy: MagicLoginStrategy,
		private magicSignupStrategy: MagicSignupStrategy,
	) {}

	// check
	@Get('email-check/:email')
	@ApiAuth.emailCheck()
	emailCheck(@Param('email') email: string) {
		return this.authService.emailCheck(email);
	}

	@Get('nickname-check/:nickname')
	@ApiAuth.nicknameCheck()
	nicknameCheck(@Param('nickname') nickname: string) {
		return this.authService.nicknameCheck(nickname);
	}

	// sign up
	@Post('signup')
	@ApiAuth.signup()
	signup(@Req() req, @Res() res) {
		this.magicSignupStrategy.send(req, res);
	}

	@Get('signup/callback')
	@UseGuards(MagicSignupAuthGuard)
	@ApiAuth.signupCallback()
	signupCallback(@Res({ passthrough: true }) res: Response, @User() user) {
		return this.authService.magicLogin(res, user);
	}

	// magic login
	@Post('login')
	@ApiAuth.login()
	login(@Req() req, @Res() res) {
		this.magicLoginStrategy.send(req, res);
	}

	@Get('login/callback')
	@UseGuards(MagicLoginAuthGuard)
	@ApiAuth.loginCallback()
	loginCallback(
		@Res({ passthrough: true }) res: Response,
		@User() user: ReqUser,
	) {
		return this.authService.magicLogin(res, user);
	}

	// admin
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

	// logout
	@Get('logout')
	@ApiAuth.logout()
	logout(@Res({ passthrough: true }) res: Response) {
		return this.authService.logout(res);
	}

	// for test
	@Get('profile')
	@UseGuards(RolesGuard([]))
	@ApiAuth.getProfile()
	getProfile(@User() user) {
		return user || 'no user';
	}

	@Get('temp-login')
	@ApiAuth.tempLogin()
	tempLogin(@Res({ passthrough: true }) res: Response) {
		return this.authService.tempLogin(res);
	}
}
