import { Injectable, NotImplementedException } from '@nestjs/common';
import { CourseDoneEntity } from 'src/entities/course-done.entity';
import { DataSource } from 'typeorm';
import { AddUserCourseDto } from './dto/add-user-course.dto';
import { DeleteUserCourseDto } from './dto/delete-user-course.dto';
import { GetUserCourseDto } from './dto/get-user-course.dto';

@Injectable()
export class CourseDoneService {
	constructor(private dataSource: DataSource) {}

	async getCoursesDone({ userId }: GetUserCourseDto) {
		const completedCourses = this.dataSource
			.createQueryBuilder()
			.select('course_done')
			.from(CourseDoneEntity, 'course_registered')
			.where('course_done.userId = :userId', { userId })
			.getMany();

		return completedCourses;
	}

	async addCourseDone({ userId, courseId }: AddUserCourseDto) {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.createQueryBuilder()
			.insert()
			.into(CourseDoneEntity)
			.values({ userId, courseId })
			.execute();

		if (affectedRows) {
			return { statusCode: 201, message: 'Created' };
		} else {
			throw new NotImplementedException(
				'course-done.service: AddUserCourse - Nothing inserted.',
			);
		}
	}

	async deleteCourseDone({ userId, courseId }: DeleteUserCourseDto) {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.createQueryBuilder()
			.delete()
			.from(CourseDoneEntity, 'course_done')
			.where('course_done.userId = :userId', { userId })
			.andWhere('course_done.courseId = :courseId', { courseId })
			.execute();

		if (affectedRows) {
			return { statusCode: 200, message: 'OK' };
		} else {
			throw new NotImplementedException(
				'course-done.service: deleteCourseDone - Nothing deleted.',
			);
		}
	}
}
