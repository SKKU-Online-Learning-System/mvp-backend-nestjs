import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { UserEntity } from 'src/entities/user.entity';
import { AdminEntity } from 'src/entities/admin.entity';

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
		// TODO add password hashing
		const admin = await this.userService.getAdmin(username);
		if (admin && admin.password === password) {
			const { password, salt, ...result } = admin;
			return result;
		}
		return null;
	}

	async validateUser(email: string): Promise<any> {
		// TODO 유저가 있으면 찾아서 돌려주고, 없으면 회원가입 시켜서 돌려주도록 작성
		const user = await this.userService.getUser(email);
		return user;
	}

	async localLogin(user: AdminEntity) {
		const payload = { id: user.id, username: user.username };
		const token = this.jwtService.sign(payload);
		return { access_token: token };
	}

	async magicLogin(user: UserEntity) {
		const payload = { id: user.id, email: user.email };
		const token = this.jwtService.sign(payload);
		return { access_token: token };
	}
}
