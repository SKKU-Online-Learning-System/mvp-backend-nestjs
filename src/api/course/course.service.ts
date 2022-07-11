import {
	Injectable,
	InternalServerErrorException,
	NotImplementedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CourseEntity } from 'src/entities/course.entity';
import { Cat1Entity } from 'src/entities/cat1.entity';
import { Cat2Entity } from 'src/entities/cat2.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseHashtagEntity } from 'src/entities/course-hashtag.entity';
import { HashtagEntity } from 'src/entities/hashtag.entity';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class CourseService {
	constructor(private dataSource: DataSource) {}

	async getAllCourses(): Promise<CourseEntity[]> {
		try {
			const courses = await this.dataSource
				.createQueryBuilder()
				.from(CourseEntity, 'course')
				.select('course')
				.getMany();
			return courses;
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async searchCourses() {
		return 'courses filtered by query string';
	}

	async getCategory1(): Promise<Cat1Entity[]> {
		try {
			const cat1 = await this.dataSource
				.createQueryBuilder()
				.from(Cat1Entity, 'cat1')
				.select('cat1')
				.getMany();
			return cat1;
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async getCategory2(): Promise<Cat2Entity[]> {
		try {
			const cat2 = await this.dataSource
				.createQueryBuilder()
				.from(Cat2Entity, 'cat2')
				.select('cat2')
				.getMany();
			return cat2;
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async getCourseById(id: number) {
		try {
			const course = await this.dataSource
				.createQueryBuilder()
				.from(CourseEntity, 'course')
				.select([
					'course.id',
					'course.title',
					'course.description',
					'course.thumbnail',
					'course.difficulty',
					'course.created_at',
				])
				.addSelect('user.email', 'instructor_name')
				.addSelect('cat1.name', 'cat1_name')
				.addSelect('cat2.name', 'cat2_name')
				.innerJoin(Cat1Entity, 'cat1', 'cat1.id = course.cat1_id')
				.innerJoin(Cat2Entity, 'cat2', 'cat2.id = course.cat2_id')
				.innerJoin(UserEntity, 'user', 'user.id = course.instructor_id')
				.where('course.id = :id', { id })
				.getRawMany();

			const hashtag = await this.dataSource
				.createQueryBuilder()
				.select('coursehash.hashtag_id')
				.from(CourseHashtagEntity, 'coursehash')
				.where('course_id = :id', { id })
				.addSelect('hashtag.tag', 'tag')
				.innerJoin(
					HashtagEntity,
					'hashtag',
					'hashtag.id = coursehash.id',
				)
				.getRawMany();
			return { course, hashtag };
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async createCourse(createCourseDto: CreateCourseDto) {
		try {
			const {
				title,
				description,
				instructorId,
				category1,
				category2,
				difficulty,
			} = createCourseDto;

			const {
				raw: { affectedRows },
			} = await this.dataSource
				.createQueryBuilder()
				.insert()
				.into(CourseEntity)
				.values({
					title,
					description,
					instructor_id: instructorId,
					cat1_id: category1,
					cat2_id: category2,
					difficulty,
				})
				.execute();

			if (affectedRows) {
				return { statusCode: 201, message: 'Created' };
			} else {
				throw new NotImplementedException(
					'course.service: createCourse - Nothing inserted.',
				);
			}
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async updateCourseById(id: number, updateCourseDto: UpdateCourseDto) {
		try {
			const { title, description, category1, category2, difficulty } =
				updateCourseDto;

			const {
				raw: { affectedRows },
			} = await this.dataSource
				.createQueryBuilder()
				.from(CourseEntity, 'course')
				.where('id = :id', { id })
				.update({
					title,
					description,
					cat1_id: category1,
					cat2_id: category2,
					difficulty,
				})
				.execute();

			if (affectedRows) {
				return { statusCode: 201, message: 'Created' };
			} else {
				throw new NotImplementedException(
					'course.service: updateCourseById - Nothing changed.',
				);
			}
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async deleteCourseById(id: number) {
		try {
			const {
				raw: { affectedRows },
			} = await this.dataSource
				.createQueryBuilder()
				.from(CourseEntity, 'course')
				.where('id = :id', { id })
				.delete()
				.execute();

			if (affectedRows) {
				return { statusCode: 201, message: 'Created' };
			} else {
				throw new NotImplementedException(
					'course.service: deleteCourseById - Nothing deleted.',
				);
			}
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}
}
