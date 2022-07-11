import {
	Injectable,
	InternalServerErrorException,
	NotImplementedException,
} from '@nestjs/common';
import { AdminEntity } from 'src/entities/admin.entity';
import { DataSource } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
	constructor(private dataSource: DataSource) {}

	async createAdmin(
		createAdminDto: CreateAdminDto,
	): Promise<{ statusCode: number; message: string }> {
		try {
			const { username, password } = createAdminDto;

			const {
				raw: { affectedRows },
			} = await this.dataSource
				.createQueryBuilder()
				.insert()
				.into(AdminEntity)
				.values({ username, password })
				.execute();

			if (affectedRows) {
				return { statusCode: 201, message: 'Created' };
			} else {
				throw new NotImplementedException(
					'user.service: createAdmin - Nothing inserted.',
				);
			}
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async getAdminByName(username: string): Promise<AdminEntity | null> {
		try {
			const admin = await this.dataSource
				.createQueryBuilder()
				.select('admin')
				.from(AdminEntity, 'admin')
				.where('admin.username = :username', { username })
				.getOne();

			return admin;
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}
}
