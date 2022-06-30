import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async signup({ email }: SignupDto) {
		if (await this.userService.emailExists(email)) {
			throw new ConflictException('This email already exists.');
		}
		return this.userService.createUser(email);
	}

	async emailCheck(email: string) {
		if (await this.userService.emailExists(email)) {
			throw new ConflictException('This email already exists.');
		}
		return {
			statusCode: 200,
			message: 'OK',
		};
	}

	async validateAdmin(username: string, password: string): Promise<any> {
		const admin = await this.userService.getAdmin(username);
		if (admin && admin.password === password) {
			const { password, salt, ...result } = admin;
			return result;
		}
		return null;
	}

	async validateUser(email: string): Promise<any> {
		const user = await this.userService.getUser(email);
		return user;
	}

	async localLogin(user: any) {
		const payload = { username: user.username, sub: user.userId };
		const token = this.jwtService.sign(payload);
		console.log(this.jwtService.decode(token));

		return {
			access_token: token,
		};
	}

	async magicLogin(token: string) {
		return this.jwtService.decode(token);
	}
}
