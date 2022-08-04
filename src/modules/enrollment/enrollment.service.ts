import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
	HttpResponse,
	status,
} from 'src/configs/http-response/http-response.config';
import { EnrollmentEntity } from 'src/entities/enrollment.entity';
import { DataSource } from 'typeorm';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { DeleteEnrollmentDto } from './dto/delete-enrollment.dto';

@Injectable()
export class EnrollmentService {
	constructor(private dataSource: DataSource) {}

	async getLearningEnrollments(userId: number) {
		return await this.dataSource.getRepository(EnrollmentEntity).find({
			where: { userId, completed: false },
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

	async createEnrollment(
		createEnrollmentDto: CreateEnrollmentDto,
	): Promise<HttpResponse> {
		const { userId, courseId } = createEnrollmentDto;

		const {
			raw: { affectedRows },
		} = await this.dataSource
			.getRepository(EnrollmentEntity)
			.insert({ userId, courseId });

		if (affectedRows !== 1) throw new InternalServerErrorException();

		return status(201);
	}

	async deleteEnrollment(
		deleteEnrollmentDto: DeleteEnrollmentDto,
	): Promise<HttpResponse> {
		const { userId, courseId } = deleteEnrollmentDto;

		const { affected } = await this.dataSource
			.getRepository(EnrollmentEntity)
			.delete({ userId, courseId });

		if (affected !== 1) throw new InternalServerErrorException();

		return status(200);
	}
}
