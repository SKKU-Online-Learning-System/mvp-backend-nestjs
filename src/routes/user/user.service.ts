import { Injectable } from '@nestjs/common';
import { User_Course } from 'src/entities/user_course.entity';
import { DataSource } from 'typeorm';
import { IUserCourse } from './interfaces/user-course.interface';

@Injectable()
export class UserService {
	constructor(private dataSource: DataSource) {}

	async getUserCourses(userId: number): Promise<IUserCourse[]> {
		const userCourseInfo = await this.dataSource
			.createQueryBuilder()
			.select('user_course')
			.from(User_Course, 'user_course')
			.where('user_course.userId = :userId', { userId })
			.getMany();
		return userCourseInfo;
	}

	async addUserCourses(
		userCourses: Omit<IUserCourse, 'status'>,
	): Promise<IUserCourse> {
		await this.dataSource
			.createQueryBuilder()
			.insert()
			.into(User_Course)
			.values([userCourses])
			.execute();
		const userId = userCourses.userId;
		const courseId = userCourses.courseId;
		const userCourseInfo = await this.dataSource
			.createQueryBuilder()
			.select('user_course')
			.from(User_Course, 'user_course')
			.where('user_course.userId = :userId', { userId })
			.andWhere('user_course.courseId = :courseId', { courseId })
			.getOne();
		return userCourseInfo;
	}

	async deleteUserCourses(userId: number, courseId: number): Promise<void> {
		await this.dataSource
			.createQueryBuilder()
			.delete()
			.from(User_Course)
			.where('userId = :userId', { userId })
			.andWhere('courseId = :courseId', { courseId })
			.execute();
	}
}
