import { Injectable } from '@nestjs/common';
import { HashtagEntity } from 'src/entities/hashtag.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class HashtagService {
	constructor(private dataSource: DataSource) {}

	async getHashtags() {
		return await this.dataSource.getRepository(HashtagEntity).find();
	}
}
