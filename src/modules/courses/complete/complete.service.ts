import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { HttpResponse, status } from 'src/configs/etc/http-response.config';
import { EnrollmentEntity } from 'src/entities/enrollment.entity';
import { History } from 'src/entities/history.entity';
import { LectureEntity } from 'src/entities/lecture.entity';
import { DataSource } from 'typeorm';
import { CreateUserCourseDto } from './dto/create-user-course.dto';

@Injectable()
export class CompleteService {
	constructor(private dataSource: DataSource) {}

	async getCompletedEnrollments(userId: number) {
		return await this.dataSource.getRepository(EnrollmentEntity).find({
			where: { userId, completed: true },
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

	async createCompletedEnrollments({
		userId,
		courseId,
	}: CreateUserCourseDto): Promise<HttpResponse> {
		const enrollment = await this.dataSource
			.getRepository(EnrollmentEntity)
			.findOneBy({ userId, courseId });
		if (enrollment.completed === true) return;

		const course = enrollment.courseId;
		const wholeLectures = await this.dataSource
			.getRepository(LectureEntity)
			.find({
				where: { courseId: course },
			});
		const finishedLectures = await this.dataSource
			.getRepository(History)
			.find({
				where: {
					userId,
					isFinished: true,
					lecture: {
						courseId: course,
					},
				},
				relations: ['lecture'],
				select: {
					lecture: {
						courseId: true,
					},
				},
			});

		if (wholeLectures.length === finishedLectures.length) {
			const { affected } = await this.dataSource
				.getRepository(EnrollmentEntity)
				.update(
					{ userId, courseId },
					{ completed: true, completedAt: new Date() },
				);

			if (affected !== 1) throw new InternalServerErrorException();
		}

		return status(201);
	}
}
