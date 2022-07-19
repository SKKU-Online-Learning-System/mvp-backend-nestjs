import { Injectable, NotImplementedException } from '@nestjs/common';
import { CourseRegisteredEntity } from 'src/entities/course-registered.entity';
import { DataSource } from 'typeorm';
import { AddUserCourseDto } from './dto/add-user-course.dto';
import { DeleteUserCourseDto } from './dto/delete-user-course.dto';
import { GetUserCourseDto } from './dto/get-user-course.dto';

@Injectable()
export class CourseRegisteredService {
	constructor(private dataSource: DataSource) {}

	async getCoursesRegistered({ userId }: GetUserCourseDto) {
		const registeredCourses = this.dataSource
			.createQueryBuilder()
			.select('course_registered')
			.from(CourseRegisteredEntity, 'course_registered')
			.where('course_registered.userId = :userId', { userId })
			.getMany();

		return registeredCourses;
	}

	async addUserCourse({ userId, courseId }: AddUserCourseDto) {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.createQueryBuilder()
			.insert()
			.into(CourseRegisteredEntity)
			.values({ userId, courseId })
			.execute();

		if (affectedRows) {
			return { statusCode: 201, message: 'Created' };
		} else {
			throw new NotImplementedException(
				'course-registered.service: createUserCourse - Nothing inserted.',
			);
		}
	}

	async deleteUserCourse({ userId, courseId }: DeleteUserCourseDto) {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.createQueryBuilder()
			.delete()
			.from(CourseRegisteredEntity, 'course_registered')
			.where('course_registered.userId = :userId', { userId })
			.andWhere('course_registered.courseId = :courseId', { courseId })
			.execute();

		if (affectedRows) {
			return { statusCode: 200, message: 'OK' };
		} else {
			throw new NotImplementedException(
				'course-registered.service: deleteUserCourse - Nothing deleted.',
			);
		}
	}
}
