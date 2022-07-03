import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/user.entity';
import { AdminEntity } from 'src/entities/admin.entity';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async signupAdmin(userData) {
		// TODO create-admin API
		// TODO 관리자 비밀번호를 해싱해서 저장하는 user API 만들고 해시 옵션 env에 저장하기
		return 'signup admin';
	}

	async emailCheck(email: string) {
		if (await this.userService.getUserByEmail(email)) {
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
		const user = await this.userService.getUserByEmail(email);
		if (user) {
			return user;
		} else {
			const userId = await this.userService.createUser(email);
			const newUser = await this.userService.getUserById(userId);
			return newUser;
		}
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
