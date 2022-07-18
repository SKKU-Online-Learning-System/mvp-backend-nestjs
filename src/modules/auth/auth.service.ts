import { Body, ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/user.entity';
import { AdminEntity } from 'src/entities/admin.entity';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
		private adminService: AdminService,
	) {}

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

	async magicLogin(user: UserEntity) {
		const payload = { id: user.id, email: user.email };
		const token = this.jwtService.sign(payload);
		return { access_token: token };
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

	async localLogin(user: AdminEntity) {
		const payload = { id: user.id, username: user.username };
		const token = this.jwtService.sign(payload);
		return { access_token: token };
	}
}
