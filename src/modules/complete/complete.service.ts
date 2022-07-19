import { Injectable, NotImplementedException } from '@nestjs/common';
import { CompleteEntity } from 'src/entities/complete.entity';
import { DataSource } from 'typeorm';
import { CreateUserCourseDto } from './dto/create-user-course.dto';
import { DeleteUserCourseDto } from './dto/delete-user-course.dto';
import { GetUserCourseDto } from './dto/get-user-course.dto';

@Injectable()
export class CompleteService {
	constructor(private dataSource: DataSource) {}

	async getCompletedCourses({ userId }: GetUserCourseDto) {
		const completedCourses = this.dataSource
			.createQueryBuilder()
			.select('complete')
			.from(CompleteEntity, 'complete')
			.where('complete.userId = :userId', { userId })
			.getMany();

		return completedCourses;
	}

	async createCompletedCourse({ userId, courseId }: CreateUserCourseDto) {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.createQueryBuilder()
			.insert()
			.into(CompleteEntity)
			.values({ userId, courseId })
			.execute();

		if (affectedRows) {
			return { statusCode: 201, message: 'Created' };
		} else {
			throw new NotImplementedException(
				'complete.service: createCompletedCourse - Nothing inserted.',
			);
		}
	}

	async deleteCompletedCourse({ userId, courseId }: DeleteUserCourseDto) {
		const { affected } = await this.dataSource
			.createQueryBuilder()
			.delete()
			.from(CompleteEntity, 'complete')
			.where('complete.userId = :userId', { userId })
			.andWhere('complete.courseId = :courseId', { courseId })
			.execute();

		if (affected) {
			return { statusCode: 200, message: 'OK' };
		} else {
			throw new NotImplementedException(
				'complete.service: deleteCompletedCourse - Nothing deleted.',
			);
		}
	}
}
