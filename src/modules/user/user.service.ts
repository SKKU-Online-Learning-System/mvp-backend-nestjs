import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
	constructor(private dataSource: DataSource) {}

	async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
		const { email, nickname } = createUserDto;

		const exist = await this.dataSource
			.getRepository(UserEntity)
			.find({ where: [{ email }, { nickname }] });

		if (exist.length) throw new BadRequestException();

		const {
			raw: { affectedRows, insertId },
		} = await this.dataSource
			.getRepository(UserEntity)
			.insert(createUserDto);

		if (!affectedRows) throw new InternalServerErrorException();

		return await this.getUserById(insertId);
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

	async getUserByNickname(nickname: string): Promise<UserEntity | null> {
		return await this.dataSource
			.getRepository(UserEntity)
			.findOneBy({ nickname });
	}
}
