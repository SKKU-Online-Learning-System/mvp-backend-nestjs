import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	signup(@Body() userData: SignupDto) {
		return this.authService.signup(userData);
	}

	@Get('emailCheck/:email')
	emailCheck(@Param('email') email: string) {
		return this.authService.emailCheck(email);
	}

	@UseGuards(LocalAuthGuard)
	@Post('login/local')
	async login(@Req() req) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Req() req) {
		return req.user;
	}
}
