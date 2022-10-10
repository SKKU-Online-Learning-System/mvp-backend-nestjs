import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpResponse, status } from 'src/configs/etc/http-response.config';
import { History } from 'src/entities/history.entity';
import { LectureEntity } from 'src/entities/lecture.entity';
import { ReqUser } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoryService {
	constructor(private dataSource: DataSource) {}

	async getByUser(user: ReqUser): Promise<History[]> {
		return await this.dataSource.getRepository(History).find({
			where: { userId: user.id },
			relations: {
				lecture: {
					course: true,
				},
			},
			select: {
				id: true,
				lastTime: true,
				updatedAt: true,
				isFinished: true,
				lecture: {
					id: true,
					title: true,
					duration: true,
					filename: true,
					course: {
						id: true,
						title: true,
						thumbnail: true,
					},
				},
			},
			order: { updatedAt: 'DESC' },
		});
	}

	async getByLecture(lectureId: number, user: ReqUser) {
		return await this.dataSource.getRepository(History).findOne({
			where: { userId: user.id, lectureId },
			relations: {
				lecture: {
					course: true,
				},
			},
			select: {
				id: true,
				lastTime: true,
				updatedAt: true,
				isFinished: true,
				lecture: {
					id: true,
					title: true,
					duration: true,
					filename: true,
					course: {
						id: true,
						title: true,
						thumbnail: true,
					},
				},
			},
		});
	}

	async update(dto: UpdateHistoryDto, user: ReqUser): Promise<HttpResponse> {
		const { lectureId, lastTime } = dto;
		const historyRepository = this.dataSource.getRepository(History);

		const history = await historyRepository.findOne({
			where: {
				userId: user.id,
				lectureId,
			},
		});

		if (!history) {
			await historyRepository.insert({
				userId: user.id,
				lectureId,
			});
		} else {
			await historyRepository.update(
				{ userId: user.id, lectureId },
				{ lastTime },
			);

			const lecture = await this.dataSource
				.getRepository(LectureEntity)
				.findOne({
					where: { id: lectureId },
				});

			if (
				history.isFinished === false &&
				lastTime / lecture?.duration > 0.95
			) {
				historyRepository.update(
					{ userId: user.id, lectureId },
					{ isFinished: true },
				);
			}
		}

		return status(200);
	}
}
