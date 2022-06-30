import {
	Injectable,
	InternalServerErrorException,
	NotImplementedException,
} from '@nestjs/common';
import { AdminEntity } from 'src/entities/admin.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
	constructor(private dataSource: DataSource) {}

	async emailExists(email: string): Promise<boolean> {
		try {
			const found = await this.dataSource
				.createQueryBuilder()
				.select('user.email')
				.from(UserEntity, 'user')
				.where('user.email = :email', { email })
				.getCount();

			if (found) {
				return true;
			}
			return false;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async createUser(email: string): Promise<any> {
		try {
			const {
				raw: { affectedRows },
			} = await this.dataSource
				.createQueryBuilder()
				.insert()
				.into(UserEntity)
				.values({ email })
				.execute();

			if (affectedRows) {
				return {
					statusCode: 200,
					message: 'OK',
				};
			} else {
				new NotImplementedException('Nothing inserted to database.');
			}
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async getAdmin(username: string): Promise<any> {
		try {
			const admin = await this.dataSource
				.createQueryBuilder()
				.select('admin')
				.from(AdminEntity, 'admin')
				.where('admin.username = :username', { username })
				.getOne();

			console.log('getAdmin in user.service', admin);
			return admin;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async getUser(email: string): Promise<any> {
		try {
			const user = await this.dataSource
				.createQueryBuilder()
				.select('user')
				.from(UserEntity, 'user')
				.where('user.email = :email', { email })
				.getOne();
			return user;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
