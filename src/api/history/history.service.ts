import { Injectable } from '@nestjs/common';
import { History } from 'src/entities/history.entity';
import { DataSource } from 'typeorm';
import { IHistory } from './interfaces/history.interface';

@Injectable()
export class HistoryService {
	constructor(private dataSource: DataSource) {}
	async getHistories(
		userId: number,
		lectureId?: number,
	): Promise<IHistory[]> {
		const query = await this.dataSource
			.createQueryBuilder()
			.select('history')
			.from(History, 'history')
			.where('history.userId = :userId', { userId });

		if (lectureId !== undefined) {
			query.andWhere('history.lectureId = :lectureId', {
				lectureId,
			});
		}

		return await query.getMany();
	}
}
