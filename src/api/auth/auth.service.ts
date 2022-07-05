import { Body, ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/user.entity';
import { AdminEntity } from 'src/entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async createAdmin(@Body() adminData: CreateAdminDto) {
		const { username, password } = adminData;
		const saltRounds = 12;
		const hash = await bcrypt.hash(password, saltRounds);
		await this.userService.createAdmin(username, hash);
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
		const admin = await this.userService.getAdminByName(username);
		if (!admin) return null;

		if (await bcrypt.compare(password, admin.password)) {
			return admin;
		} else {
			return null;
		}
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
