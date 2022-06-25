import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { DataSource } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private dataSource: DataSource,
	) {}

	async signup({ email, password, name }: SignupDto) {
		await this.dataSource
			.createQueryBuilder()
			.insert()
			.into(User)
			.values({
				email,
				password,
				name,
			})
			.execute();
	}

	async emailCheck(email: string) {
		const exist = await this.dataSource
			.createQueryBuilder()
			.select(['user.email', 'user.password', 'user.name'])
			.from(User, 'user')
			.where('user.email = :email', { email })
			.getMany();
		console.log(exist);

		return exist;
	}

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.userService.findOne(username);
		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: any) {
		const payload = { username: user.username, sub: user.userId };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
