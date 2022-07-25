import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { HistoryEntity } from 'src/entities/history.entity';
import { LectureEntity } from 'src/entities/lecture.entity';
import { DataSource } from 'typeorm';
import { CreateOrUpdateHistoryDto } from './dto/create-or-update-history.dto';
import { GetHistoryDto } from './dto/get-history.dto';

@Injectable()
export class HistoryService {
	constructor(private dataSource: DataSource) {}
	async getHistories({
		userId,
		lectureId,
	}: GetHistoryDto): Promise<HistoryEntity[]> {
		const query = await this.dataSource
			.createQueryBuilder()
			.select('history')
			.from(HistoryEntity, 'history')
			.where('history.userId = :userId', { userId });

		if (lectureId !== undefined) {
			query.andWhere('history.lectureId = :lectureId', {
				lectureId,
			});
		}

		return await query.getMany();
	}

	async getHistoriesLatest({ userId }: GetHistoryDto) {
		return await this.dataSource
			.createQueryBuilder()
			.from(HistoryEntity, 'history')
			.innerJoin(
				LectureEntity,
				'lecture',
				'lecture.id = history.lectureId',
			)
			.select([
				'history.id AS id',
				'history.lastTime AS lastTime',
				'history.updatedAt AS updatedAT',
				'history.isFinished AS isFinished',
				'lecture.title AS title',
				'lecture.duration AS duration',
				'lecture.filename AS filename',
			])
			.where('history.userId = :userId', { userId })
			.orderBy('history.updatedAt', 'DESC')
			.getRawMany();
	}

	async createOrUpdateHistory(
		createOrUpdateHistoryDto: CreateOrUpdateHistoryDto,
	) {
		const { userId, lectureId, lastTime } = createOrUpdateHistoryDto;

		const histories = await this.getHistories({ userId, lectureId });
		if (histories.length === 0) {
			await this.createHistory(createOrUpdateHistoryDto);
		} else {
			await this.updateHistory(createOrUpdateHistoryDto);

			const lectureDuration = await this.getLectureDuration(lectureId);
			if (
				!histories[0].isFinished &&
				this.isLectureFinished(lastTime, lectureDuration)
			) {
				this.updateIsFinished(userId, lectureId);
			}
		}

		return 'update history';
	}

	async createHistory(createOrUpdateHistoryDto: CreateOrUpdateHistoryDto) {
		await this.dataSource
			.createQueryBuilder()
			.insert()
			.into(HistoryEntity)
			.values([createOrUpdateHistoryDto])
			.execute();
	}

	async updateHistory({
		userId,
		lectureId,
		lastTime,
	}: CreateOrUpdateHistoryDto) {
		await this.dataSource
			.createQueryBuilder()
			.update(HistoryEntity)
			.set({ lastTime: lastTime })
			.where('userId = :userId', { userId })
			.andWhere('lectureId = :lectureId', { lectureId })
			.execute();
	}

	async getLectureDuration(lectureId: number) {
		const lecture = await this.dataSource
			.createQueryBuilder()
			.select('lecture')
			.from(LectureEntity, 'lecture')
			.where('lecture.id = :lectureId', { lectureId })
			.getOne();

		if (!lecture) {
			throw new NotFoundException('Lecture Not Found(FK)');
		}

		return lecture.duration;
	}

	isLectureFinished(lastTime: number, duration: number): boolean {
		if (lastTime / duration > 0.95) {
			return true;
		} else {
			return false;
		}
	}

	async updateIsFinished(userId: number, lectureId: number) {
		await this.dataSource
			.createQueryBuilder()
			.update(HistoryEntity)
			.set({ isFinished: true })
			.where('userId = :userId', { userId })
			.andWhere('lectureId = :lectureId', { lectureId })
			.execute();
	}
}
