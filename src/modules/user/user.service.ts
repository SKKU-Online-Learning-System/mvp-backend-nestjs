import {
	Injectable,
	InternalServerErrorException,
	NotImplementedException,
} from '@nestjs/common';
import { CourseRegisteredEntity } from 'src/entities/course-registered.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateUserCourseDto } from './dto/create-user-course.dto';
import { DeleteUserCourseDto } from './dto/delete-user-course.dto';

@Injectable()
export class UserService {
	constructor(private dataSource: DataSource) {}

	async createUser(email: string): Promise<number> {
		const {
			raw: { affectedRows, insertId },
		} = await this.dataSource
			.createQueryBuilder()
			.insert()
			.into(UserEntity)
			.values({ email })
			.execute();

		if (affectedRows) {
			return insertId;
		} else {
			throw new NotImplementedException(
				'user.service: createUser - Nothing inserted.',
			);
		}
	}

	async getUserById(id: number): Promise<UserEntity | null> {
		const user = await this.dataSource
			.createQueryBuilder()
			.select('user')
			.from(UserEntity, 'user')
			.where('user.id = :id', { id })
			.getOne();
		return user;
	}

	async getUserByEmail(email: string): Promise<UserEntity | null> {
		const user = await this.dataSource
			.createQueryBuilder()
			.select('user')
			.from(UserEntity, 'user')
			.where('user.email = :email', { email })
			.getOne();
		return user;
	}

	async getUserCourses(id: number): Promise<CourseRegisteredEntity[]> {
		const userCourses = await this.dataSource
			.createQueryBuilder()
			.select('user_course')
			.from(CourseRegisteredEntity, 'user_course')
			.where('user_course.userId = :id', { id })
			.getMany();
		return userCourses;
	}

	async createUserCourse(
		createUserCourseDto: CreateUserCourseDto,
	): Promise<{ statusCode: number; message: string }> {
		const { userId, courseId } = createUserCourseDto;

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
				'user.service: createUserCourse - Nothing inserted.',
			);
		}
	}

	async deleteUserCourse(
		deleteUserCourseDto: DeleteUserCourseDto,
	): Promise<{ statusCode: number; message: string }> {
		const { userId, courseId } = deleteUserCourseDto;

		const {
			raw: { affectedRows },
		} = await this.dataSource
			.createQueryBuilder()
			.delete()
			.from(CourseRegisteredEntity, 'user_course')
			.where('user_course.user_id = :userId', { userId })
			.andWhere('user_course.course_id = :courseId', { courseId })
			.execute();

		if (affectedRows) {
			return { statusCode: 200, message: 'OK' };
		} else {
			throw new NotImplementedException(
				'user.service: deleteUserCourse - Nothing deleted.',
			);
		}
	}
}
