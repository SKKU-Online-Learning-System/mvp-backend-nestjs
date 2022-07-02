import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { MagicLoginStrategy } from './strategies/magic-login.strategy';

@ApiTags('/auth')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private magicLoginStrategy: MagicLoginStrategy,
	) {}

	@Post('signup')
	signup(@Body() userData: SignupDto) {
		return this.authService.signup(userData);
	}

	@Post('signup-admin')
	signupAdmin(@Body() userData) {
		return this.authService.signupAdmin(userData);
	}

	@Get('emailCheck/:email')
	emailCheck(@Param('email') email: string) {
		return this.authService.emailCheck(email);
	}

	@UseGuards(AuthGuard('local'))
	@Post('login/local')
	async localLogin(@Req() req) {
		return this.authService.localLogin(req.user);
	}

	@Post('login/magic')
	async magicLogin(@Req() req, @Res() res) {
		await this.magicLoginStrategy.send(req, res);
	}

	@UseGuards(AuthGuard('magic-login'))
	@Get('login/magic/callback')
	magicLoginCallback(@Req() req) {
		return this.authService.magicLogin(req.user);
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('profile')
	getProfile(@Req() req) {
		return req.user || 'no req.user';
	}
}
