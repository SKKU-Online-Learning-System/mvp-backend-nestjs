import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
// import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { LocalAuthGuard } from '../../configs/guards/local-auth.guard';
//import { MagicLoginAuthGuard } from '../../configs/guards/magic-login.guard';
//import { MagicLoginStrategy } from './strategies/magic-login.strategy';
import { User } from 'src/configs/decorator/user.decorator';
import { Response } from 'express';
import { ApiAuth } from './auth.swagger';
//import { MagicSignupStrategy } from './strategies/magic-signup.strategy';
//import { MagicSignupAuthGuard } from '../../configs/guards/magic-signup.guard';
import { RolesGuard } from '../../configs/guards/roles.guard';
import { ReqUser, Role } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { status } from 'src/configs/etc/http-response.config';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { getRepository } from 'typeorm';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private userService: UserService,
		//private magicLoginStrategy: MagicLoginStrategy,
		//private magicSignupStrategy: MagicSignupStrategy,
	) {}

	@Post() // auth 엔드포인트 경로를 추가
	async ssoLogin(@Res({ passthrough: true }) res: Response) {
		res.redirect('https://mrdang.cs.skku.edu/login');
    	//return this.authService.localLogin(res, user);
	}
	@Get('login')
	async login(@Res({ passthrough: true }) res: Response, @Query('st_id') st_id: string, @Query('st_name') st_name: string, @Query('st_degree') st_degree: string, @Query('st_status') st_status: string, @Query('st_dept') st_dept: string) {
    	// 사용자 정보를 객체로 생성
		const createUserDto: CreateUserDto = {
			st_id,
			st_name,
			st_degree,
			st_status,
			st_dept,
		  };
		const existUser = await this.userService.getUserBystId(st_id);
		if(existUser){
			await this.authService.localLogin(res,existUser);
			res.redirect('https://mrdang.cs.skku.edu');
		}
		else{
			await this.userService.createUser(createUserDto);
			res.redirect('https://mrdang.cs.skku.edu/login');
		}
		//this.authService.tempLogin(res);
		
    	//return this.authService.localLogin(res, user);
	}

	// // check
	// @Get('email-check/:email')
	// @ApiAuth.emailCheck()
	// emailCheck(@Param('email') email: string) {
	// 	return this.authService.emailCheck(email);
	// }

	// @Get('nickname-check/:nickname')
	// @ApiAuth.nicknameCheck()
	// nicknameCheck(@Param('nickname') nickname: string) {
	// 	return this.authService.nicknameCheck(nickname);
	// }

	// sign up
	// @Post('signup')
	// @ApiAuth.signup()
	// signup(@Req() req, @Res() res) {
	// 	this.magicSignupStrategy.send(req, res);
	// }

	// @Get('signup/callback')
	// @UseGuards(MagicSignupAuthGuard)
	// @ApiAuth.signupCallback()
	// signupCallback(@Res({ passthrough: true }) res: Response, @User() user) {
	// 	return this.authService.magicLogin(res, user);
	// }

	// // magic login
	// @Post('login')
	// @ApiAuth.login()
	// async login(@Req() req, @Res() res, @Body('destination') email: string) {
	// 	const user = await this.userService.getUserByEmail(email);
	// 	if (user) this.magicLoginStrategy.send(req, res);
	// 	else throw new UnauthorizedException();
	// }

	// @Get('login/callback')
	// @UseGuards(MagicLoginAuthGuard)
	// @ApiAuth.loginCallback()
	// loginCallback(
	// 	@Res({ passthrough: true }) res: Response,
	// 	@User() user: ReqUser,
	// ) {
	// 	return this.authService.magicLogin(res, user);
	// }

	// admin
	// @Post('admin')
	// @ApiAuth.createAdmin()
	// createAdmin(@Body() createAdminDto: CreateAdminDto) {
	// 	return this.authService.createAdmin(createAdminDto);
	// }

	// @Post('admin/login')
	// @UseGuards(LocalAuthGuard)
	// @ApiAuth.adminLogin()
	// adminLogin(@Res({ passthrough: true }) res: Response, @User() user) {
	// 	return this.authService.localLogin(res, user);
	// }

	// logout
	@Get('logout')
	@ApiAuth.logout()
	logout(@Res({ passthrough: true }) res: Response) {
		this.authService.logout(res);
		res.redirect("https://mrdang.cs.skku.edu/login/logout");
	}

	// for test
	@Get('profile')
	@UseGuards(RolesGuard([Role.USER]))
	@ApiAuth.getProfile()
	async getProfile(@User() user: ReqUser) {
		if (user) {
			try {
				const userProfile = await this.userService.getUserBystId(user.st_id);
				return userProfile;
			} catch (error) {
			  return 'Error fetching user profile';
			}
		  } else {
			return 'No user';
		  }
	}

	@Get('temp-login')
	@ApiAuth.tempLogin()
	tempLogin(@Res({ passthrough: true }) res: Response) {
		return this.authService.tempLogin(res);
	}
}
