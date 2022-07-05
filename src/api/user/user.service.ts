import {
	Injectable,
	InternalServerErrorException,
	NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/entities/admin.entity';
import { UserCourseEntity } from 'src/entities/user-course.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { IUserCourse } from './interfaces/user-course.interface';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
		@InjectRepository(AdminEntity)
		private adminRepository: Repository<AdminEntity>,
		@InjectRepository(UserCourseEntity)
		private userCourseRepository: Repository<UserCourseEntity>
	) {}

	async getUserById(id: number): Promise<UserEntity | null> {
		try {
			const user = await this.userRepository
				.createQueryBuilder('user')
				.select('user')
				.where('user.id = :id', { id })
				.getOne();
			return user;
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async getUserByEmail(email: string): Promise<UserEntity | null> {
		try {
			const user = await this.userRepository
				.createQueryBuilder('user')
				.select('user')
				.where('user.email = :email', { email })
				.getOne();
			return user;
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async createUser(email: string): Promise<number> {
		try {
			const {
				raw: { affectedRows, insertId },
			} = await this.userRepository
				.createQueryBuilder('user')
				.insert()
				.values({ email })
				.execute();

			if (affectedRows) {
				return insertId;
			} else {
				throw new NotImplementedException(
					'Nothing inserted to database.',
				);
			}
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async createAdmin(username, password) {
		try {
			await this.adminRepository
				.createQueryBuilder()
				.insert()
				.values({ username, password })
				.execute();
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async getAdminByName(username: string): Promise<AdminEntity | null> {
		try {
			const admin = await this.adminRepository
				.createQueryBuilder('admin')
				.select('admin')
				.where('admin.username = :username', { username })
				.getOne();
			return admin;
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async getUserCourses(userId: number): Promise<IUserCourse[]> {
		try {
			const userCourseInfo = await this.userCourseRepository
				.createQueryBuilder('user_course')
				.select('user_course')
				.where('user_course.userId = :userId', { userId })
				.getMany();
			return userCourseInfo;
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
		
	}

	async addUserCourses(
		userCourses: Omit<IUserCourse, 'status'>,
	): Promise<IUserCourse> {
		try {
			await this.userCourseRepository
				.createQueryBuilder()
				.insert()
				.values([userCourses])
				.execute();
			const userId = userCourses.userId;
			const courseId = userCourses.courseId;
			const userCourseInfo = await this.userCourseRepository
				.createQueryBuilder('user_course')
				.select('user_course')
				.where('user_course.userId = :userId', { userId })
				.andWhere('user_course.courseId = :courseId', { courseId })
				.getOne();
			return userCourseInfo;
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async deleteUserCourses(userId: number, courseId: number): Promise<void> {
		try {
			await this.userCourseRepository
				.createQueryBuilder('user_course')
				.delete()
				.where('user_course.userId = :userId', { userId })
				.andWhere('user_course.courseId = :courseId', { courseId })
				.execute();
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}
}
