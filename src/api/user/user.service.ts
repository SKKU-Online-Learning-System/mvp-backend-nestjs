import {
	Injectable,
	InternalServerErrorException,
	NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/entities/admin.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
		@InjectRepository(AdminEntity)
		private adminRepository: Repository<AdminEntity>,
	) {}

	async getUserById(id: number): Promise<UserEntity | null> {
		try {
			const user = await this.userRepository
				.createQueryBuilder('user')
				.select('user')
				.where('user.id = :id', { id })
				.getOne();
			return user;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async getUserByEmail(email: string): Promise<UserEntity | null> {
		try {
			const user = await this.userRepository
				.createQueryBuilder('user')
				.select('user')
				.where('user.email = :email', { email })
				.getOne();
			return user;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async createUser(email: string): Promise<number> {
		try {
			const {
				raw: { affectedRows, insertId },
			} = await this.userRepository
				.createQueryBuilder('user')
				.insert()
				.values({ email })
				.execute();

			if (affectedRows) {
				return insertId;
			} else {
				throw new NotImplementedException(
					'Nothing inserted to database.',
				);
			}
		} catch (e) {
			throw new InternalServerErrorException('error');
		}
	}

	async getAdmin(username: string): Promise<any> {
		try {
			const admin = await this.adminRepository
				.createQueryBuilder('admin')
				.select('admin')
				.where('admin.username = :username', { username })
				.getOne();

			console.log('getAdmin in user.service', admin);
			return admin;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
