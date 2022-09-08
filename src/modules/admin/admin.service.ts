import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpResponse, status } from 'src/configs/etc/http-response.config';
import { AdminEntity } from 'src/entities/admin.entity';
import { DataSource } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
	constructor(private dataSource: DataSource) {}

	async createAdmin(createAdminDto: CreateAdminDto): Promise<HttpResponse> {
		const { username, password } = createAdminDto;

		const {
			raw: { affectedRows },
		} = await this.dataSource
			.getRepository(AdminEntity)
			.insert({ username, password });

		if (!affectedRows) throw new InternalServerErrorException();

		return status(201);
	}

	async getAdminByName(username: string): Promise<AdminEntity | null> {
		const admin = await this.dataSource
			.getRepository(AdminEntity)
			.findOne({ where: { username } });

		return admin;
	}
}
