import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { LocalAuthGuard } from '../../configs/guards/local-auth.guard';
import { MagicLoginAuthGuard } from '../../configs/guards/magic-login.guard';
import { MagicLoginStrategy } from './strategies/magic-login.strategy';
import { User } from 'src/configs/decorator/user.decorator';
import { Response } from 'express';
import { ApiAuth } from './auth.swagger';
import { MagicSignupStrategy } from './strategies/magic-signup.strategy';
import { MagicSignupAuthGuard } from '../../configs/guards/magic-signup.guard';
import { RolesGuard } from '../../configs/guards/roles.guard';
import { ReqUser, Role } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { status } from 'src/configs/etc/http-response.config';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private userService: UserService,
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
	async login(
		@Req() req,
		@Res({ passthrough: true }) res,
		@Body('destination') email: string,
	) {
		const user = await this.userService.getUserByEmail(email);
		console.log(user);
		if (user) {
			this.magicLoginStrategy.send(req, res);
			return status(200);
		} else throw new NotFoundException();
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
	@UseGuards(RolesGuard([Role.USER]))
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
