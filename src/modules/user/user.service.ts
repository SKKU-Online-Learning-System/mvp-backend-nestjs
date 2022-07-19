import { Injectable, NotImplementedException } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
	constructor(private dataSource: DataSource) {}

	async createUser(email: string): Promise<number> {
		const {
			raw: { affectedRows, insertId },
		} = await this.dataSource
			.createQueryBuilder()
			.insert()
			.into(UserEntity)
			.values({ email })
			.execute();

		if (affectedRows) {
			return insertId;
		} else {
			throw new NotImplementedException(
				'user.service: createUser - Nothing inserted.',
			);
		}
	}

	async getUserById(id: number): Promise<UserEntity | null> {
		const user = await this.dataSource
			.createQueryBuilder()
			.select('user')
			.from(UserEntity, 'user')
			.where('user.id = :id', { id })
			.getOne();
		return user;
	}

	async getUserByEmail(email: string): Promise<UserEntity | null> {
		const user = await this.dataSource
			.createQueryBuilder()
			.select('user')
			.from(UserEntity, 'user')
			.where('user.email = :email', { email })
			.getOne();
		return user;
	}
}
