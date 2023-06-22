import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
// import { CreateAdminDto } from '../admin/dto/create-admin.dto';
// import { AdminService } from '../admin/admin.service';
import { Response } from 'express';
import { HttpResponse, status } from 'src/configs/etc/http-response.config';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ReqUser, Role, UserEntity } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
		// private adminService: AdminService,
	) {}

	// check
	async emailCheck(email: string): Promise<HttpResponse> {
		const user = await this.userService.getUserByEmail(email);
		if (user) return status(409);
		else return status(200);
	}

	async nicknameCheck(nickname: string): Promise<HttpResponse> {
		const user = await this.userService.getUserByNickname(nickname);
		if (user) return status(409);
		else return status(200);
	}

	// signup
	async signup(createUserDto: CreateUserDto): Promise<UserEntity | null> {
		const user = await this.userService.createUser(createUserDto);
		if (user) return user;
		else return null;
	}

	// magic login
	async magicLoginValidation(email: string): Promise<UserEntity | null> {
		const user = await this.userService.getUserByEmail(email);
		if (user) return user;
		else return null;
	}

	magicLogin(res: Response, user: ReqUser): HttpResponse {
		const { id, email, nickname, role } = user;
		const payload = { id, email, nickname, role };
		const token = this.jwtService.sign(payload);
		res.cookie('Authorization', token, {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});
		return status(200);
	}

	// admin
	// async createAdmin(createAdminDto: CreateAdminDto): Promise<HttpResponse> {
	// 	const { username, password } = createAdminDto;
	// 	const saltRounds = 12;
	// 	const hash = await bcrypt.hash(password, saltRounds);
	// 	await this.adminService.createAdmin({ username, password: hash });
	// 	return status(201);
	// }

	// async validateAdmin(username: string, password: string): Promise<any> {
	// 	const admin = await this.adminService.getAdminByName(username);
	// 	if (!admin) return null;

	// 	if (await bcrypt.compare(password, admin.password)) {
	// 		return admin;
	// 	} else {
	// 		return null;
	// 	}
	// }

	async localLogin(res: Response, user): Promise<HttpResponse> {
		const payload = { id: user.id, username: user.username };
		const token = this.jwtService.sign(payload);
		res.cookie('Authorization', token, {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});
		return status(200);
	}

	// logout
	logout(res: Response): HttpResponse {
		res.clearCookie('Authorization');
		return status(200);
	}

	// for test
	tempLogin(res: Response): HttpResponse {
		const token = this.jwtService.sign({
			id: 1,
			email: 'a@a.com',
			nickname: 'user a',
			role: Role.INSTRUCTOR,
		});
		res.cookie('Authorization', token, {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});
		return status(200);
	}
}
