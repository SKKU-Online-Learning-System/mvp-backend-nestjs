import { Injectable } from '@nestjs/common';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { Banner } from 'src/entities/banner.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class BannerService {
	constructor(private dataSource: DataSource) {}

	async uploadFiles(): Promise<string[]> {
		return await readdir(join(__dirname, '../../../public/images/banners'));
	}

	async getActives() {
		return this.dataSource.getRepository(Banner).find({
			where: { isActive: true },
		});
	}
}
