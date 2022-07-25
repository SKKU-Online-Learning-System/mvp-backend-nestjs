import { Injectable, NotImplementedException } from '@nestjs/common';
import { CourseEntity } from 'src/entities/course.entity';
import { LearningEntity } from 'src/entities/learning.entity';
import { DataSource } from 'typeorm';
import { CreateUserCourseDto } from './dto/create-user-course.dto';
import { DeleteUserCourseDto } from './dto/delete-user-course.dto';
import { GetUserCourseDto } from './dto/get-user-course.dto';

@Injectable()
export class LearningService {
	constructor(private dataSource: DataSource) {}

	async getLearningCourses({ userId }: GetUserCourseDto) {
		const learningCourses = this.dataSource
			.createQueryBuilder()
			.from(LearningEntity, 'learning')
			.innerJoin(CourseEntity, 'course', 'learning.courseId = course.id')
			.select([
				'learning.id AS id',
				'learning.bookmark AS bookmark',
				'learning.courseId AS courseId',
				'course.title AS title',
				'course.description AS description',
				'course.category1Id AS category1Id',
				'course.category2Id AS category2Id',
				'course.thumbnail AS thumbnail',
			])
			.where('learning.userId = :userId', { userId })
			.getRawMany();

		return learningCourses;
	}

	async createLearningCourse({ userId, courseId }: CreateUserCourseDto) {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.createQueryBuilder()
			.insert()
			.into(LearningEntity)
			.values({ userId, courseId })
			.execute();

		if (affectedRows) {
			return { statusCode: 201, message: 'Created' };
		} else {
			throw new NotImplementedException(
				'learning.service: createLearningCourse - Nothing inserted.',
			);
		}
	}

	async deleteLearningCourse({ userId, courseId }: DeleteUserCourseDto) {
		const { affected } = await this.dataSource
			.createQueryBuilder()
			.delete()
			.from(LearningEntity, 'learning')
			.where('learning.userId = :userId', { userId })
			.andWhere('learning.courseId = :courseId', { courseId })
			.execute();

		if (affected !== 0) {
			return { statusCode: 200, message: 'OK' };
		} else {
			throw new NotImplementedException(
				'learning.service: deleteLearningCourse - Nothing deleted.',
			);
		}
	}
}
