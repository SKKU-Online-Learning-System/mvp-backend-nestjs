import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { HttpResponse, status } from 'src/configs/etc/http-response.config';
import { History } from 'src/entities/history.entity';
import { LaunchingEventEntity } from 'src/entities/launching-event.entity';
import { LectureEntity } from 'src/entities/lecture.entity';
import { ReqUser, UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoryService {
	constructor(
		private dataSource: DataSource,
		private readonly httpService: HttpService,
	) {}

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

	async getNotFinishedGroupByCourse(user: ReqUser) {
		return await this.dataSource
			.getRepository(History)
			.createQueryBuilder('history')
			.leftJoinAndSelect('history.lecture', 'lecture')
			.leftJoinAndSelect('lecture.course', 'course')
			.select('course.id', 'courseId')
			.addSelect('course.title', 'courseTitle')
			.addSelect('COUNT(*)', 'notFinishedLecture')
			.where('history.userId = :userId', { userId: user.id })
			.andWhere('history.isFinished = :isFinished', { isFinished: false })
			.groupBy('course.id')
			.getRawMany();
	}

	async update(dto: UpdateHistoryDto, user: ReqUser): Promise<HttpResponse> {
		const { lectureId, lastTime } = dto;
		const historyRepository = this.dataSource.getRepository(History);
		const userRepository = this.dataSource.getRepository(UserEntity);
		const launchingEventRepository =
			this.dataSource.getRepository(LaunchingEventEntity);

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
				await historyRepository.update(
					{ userId: user.id, lectureId },
					{ isFinished: true },
				);
				// 유저 레포지토리에서 시청한 강의 개수 카운트 증가
				await this.dataSource
					.createQueryBuilder()
					.update(UserEntity)
					.set({
						watchedLecturesCount: () => 'watchedLecturesCount + 1',
					})
					.where('id = :id', { id: user.id })
					.execute();
				// 증가 시 지정한 X개 이상인 경우 킹고코인 API 호출
				const updatedUser = await userRepository.findOne({
					where: { id: user.id },
				});
				const eventInfo = await launchingEventRepository.findOne({
					where: { user: user.id },
				});
				if (updatedUser.watchedLecturesCount === 1 && !eventInfo) {
					await this.dataSource
						.createQueryBuilder()
						.insert()
						.into(LaunchingEventEntity)
						.values({
							isProcessed: true,
							user: user.id,
						})
						.execute();
					const transaction = await this.dataSource
						.getRepository(LaunchingEventEntity)
						.findOne({
							where: { user: user.id },
						});
					const response = await firstValueFrom(
						this.httpService.post(
							'https://kingocoin.cs.skku.edu/api/third-party/point/send',
							{
								email: user.email,
								transactionId: transaction.id,
								description: '명륜당 영상시청',
								point: 400,
								platform: '온라인명륜당',
							},
						),
					);
					console.log(response);
				}
			}
		}

		return status(200);
	}
}
