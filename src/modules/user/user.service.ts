import {
	Injectable,
	InternalServerErrorException,
	NotImplementedException,
} from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
	constructor(private dataSource: DataSource) {}

	async createUser(email: string): Promise<number> {
		const {
			raw: { affectedRows, insertId },
		} = await this.dataSource.getRepository(UserEntity).insert({ email });

		if (!affectedRows) throw new InternalServerErrorException();

		return insertId;
	}

	async getUserById(id: number): Promise<UserEntity | null> {
		return await this.dataSource
			.getRepository(UserEntity)
			.findOneBy({ id });
	}

	async getUserByEmail(email: string): Promise<UserEntity | null> {
		return await this.dataSource
			.getRepository(UserEntity)
			.findOneBy({ email });
	}
}
