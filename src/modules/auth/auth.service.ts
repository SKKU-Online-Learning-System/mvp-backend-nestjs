import { Body, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { AdminService } from '../admin/admin.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
		private adminService: AdminService,
	) {}

	// user
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

	magicLogin(res: Response, user) {
		const payload = { id: user.id, email: user.email };
		const token = this.jwtService.sign(payload);
		res.cookie('Authorization', token, { httpOnly: true });
		return { statusCode: 200, message: 'OK' };
	}

	// admin
	async createAdmin(@Body() createAdminDto: CreateAdminDto) {
		const { username, password } = createAdminDto;
		const saltRounds = 12;
		const hash = await bcrypt.hash(password, saltRounds);
		await this.adminService.createAdmin({ username, password: hash });
		return 'signup admin';
	}

	async validateAdmin(username: string, password: string): Promise<any> {
		const admin = await this.adminService.getAdminByName(username);
		if (!admin) return null;

		if (await bcrypt.compare(password, admin.password)) {
			return admin;
		} else {
			return null;
		}
	}

	async localLogin(res: Response, user) {
		const payload = { id: user.id, username: user.username };
		const token = this.jwtService.sign(payload);
		res.cookie('Authorization', token, { httpOnly: true });
		return { statusCode: 200, message: 'OK' };
	}

	// logout
	logout(res: Response) {
		res.cookie('Authorization', '', { httpOnly: true });
		return { statusCode: 200, message: 'OK' };
	}

	// for test
	getToken() {
		const token_1 = this.jwtService.sign({ id: 1, email: 'a@a.com' });
		const token_2 = this.jwtService.sign({ id: 2, email: 'b@b.com' });
		const token_3 = this.jwtService.sign({ id: 3, email: 'c@c.com' });
		return { token_1, token_2, token_3 };
	}
}
