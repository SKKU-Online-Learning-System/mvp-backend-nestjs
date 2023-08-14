import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { HttpResponse, status } from 'src/configs/etc/http-response.config';
import { Role, UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/configs/decorator/user.decorator';
@Injectable()
export class UserService {
	constructor(private dataSource: DataSource) {}

	async getAllUsers() {
		return await this.dataSource.getRepository(UserEntity).find();
	}

	async updateUserById(
		userId: number,
		updateUserDto: UpdateUserDto,
	): Promise<HttpResponse> {
		await this.dataSource
			.getRepository(UserEntity)
			.update(userId, updateUserDto);
		return status(201);
	}

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

	async isAdmin(@User() user): Promise<boolean> {
		// console.log(user);
		const foundUser = await this.dataSource.getRepository(UserEntity).findOne({ 
			where: { email: user.email } 
		});
		if (!foundUser) {
			throw new BadRequestException('User not found');
		}
		return foundUser.role === Role.ADMIN;
	}
	
}
