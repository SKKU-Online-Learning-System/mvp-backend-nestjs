import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EnrollmentEntity } from 'src/entities/enrollment.entity';
import { HttpResponse, status } from 'src/configs/etc/http-response.config';
@Injectable()
export class BookmarkService {
	constructor(private dataSource: DataSource) {}

	async getAllBookmarks(userId: number) {
		return await this.dataSource.getRepository(EnrollmentEntity).find({
			where: { userId, bookmark: true },
			relations: {
				course: {
					instructor: true,
					category1: true,
					category2: true,
				},
			},
			select: {
				course: {
					id: true,
					title: true,
					description: true,
					summary: true,
					instructor: {
						nickname: true,
					},
					category1: {
						name: true,
					},
					category2: {
						name: true,
					},
					thumbnail: true,
					difficulty: true,
					createdAt: true,
				},
				createdAt: true,
				bookmark: true,
			},
			order: {
				completed: 'ASC',
			},
		});
	}

	async getAllLearningBookmarks(userId: number) {
		return await this.dataSource.getRepository(EnrollmentEntity).find({
			where: { userId, bookmark: true, completed: false },
			relations: {
				course: {
					instructor: true,
					category1: true,
					category2: true,
				},
			},
			select: {
				course: {
					id: true,
					title: true,
					description: true,
					summary: true,
					instructor: {
						nickname: true,
					},
					category1: {
						name: true,
					},
					category2: {
						name: true,
					},
					thumbnail: true,
					difficulty: true,
					createdAt: true,
				},
				createdAt: true,
				bookmark: true,
			},
		});
	}

	async getAllCompletedBookmarks(userId: number) {
		return await this.dataSource.getRepository(EnrollmentEntity).find({
			where: { userId, bookmark: true, completed: true },
			relations: {
				course: {
					instructor: true,
					category1: true,
					category2: true,
				},
			},
			select: {
				course: {
					id: true,
					title: true,
					description: true,
					summary: true,
					instructor: {
						nickname: true,
					},
					category1: {
						name: true,
					},
					category2: {
						name: true,
					},
					thumbnail: true,
					difficulty: true,
					createdAt: true,
				},
				createdAt: true,
				bookmark: true,
			},
		});
	}

	async createBookmarkByCourseId(
		userId: number,
		courseId: number,
	): Promise<HttpResponse> {
		const { affected } = await this.dataSource
			.getRepository(EnrollmentEntity)
			.update({ userId, courseId }, { bookmark: true });

		if (affected !== 1) throw new InternalServerErrorException();

		return status(201);
	}

	async deleteBookmarkByCourseId(
		userId: number,
		courseId: number,
	): Promise<HttpResponse> {
		const { affected } = await this.dataSource
			.getRepository(EnrollmentEntity)
			.update({ userId, courseId }, { bookmark: false });

		if (affected !== 1) throw new InternalServerErrorException();

		return status(200);
	}
}
