import {
	Injectable,
	InternalServerErrorException,
	NotImplementedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CourseEntity } from 'src/entities/course.entity';
import { Category1Entity } from 'src/entities/category1.entity';
import { Category2Entity } from 'src/entities/category2.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseHashtagEntity } from 'src/entities/course-hashtag.entity';
import { HashtagEntity } from 'src/entities/hashtag.entity';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class CourseService {
	constructor(private dataSource: DataSource) {}

	async getAllCourses(): Promise<CourseEntity[]> {
		const courses = await this.dataSource
			.createQueryBuilder()
			.from(CourseEntity, 'course')
			.select('course')
			.getMany();
		return courses;
	}

	async searchCourses() {
		return 'courses filtered by query string';
	}

	async getCategory1(): Promise<Category1Entity[]> {
		const cat1 = await this.dataSource
			.createQueryBuilder()
			.from(Category1Entity, 'cat1')
			.select('cat1')
			.getMany();
		return cat1;
	}

	async getCategory2(): Promise<Category2Entity[]> {
		const category2 = await this.dataSource
			.createQueryBuilder()
			.from(Category2Entity, 'cat2')
			.select('cat2')
			.getMany();
		return category2;
	}

	async getCourseById(id: number) {
		const course = await this.dataSource
			.createQueryBuilder()
			.from(CourseEntity, 'course')
			.select([
				'course.id',
				'course.title',
				'course.description',
				'course.thumbnail',
				'course.difficulty',
				'course.createdAt',
			])
			.addSelect('user.email', 'instructor_name')
			.addSelect('cat1.name', 'cat1_name')
			.addSelect('cat2.name', 'cat2_name')
			.innerJoin(Category1Entity, 'cat1', 'cat1.id = course.category1Id')
			.innerJoin(Category2Entity, 'cat2', 'cat2.id = course.category2Id')
			.innerJoin(UserEntity, 'user', 'user.id = course.instructorId')
			.where('course.id = :id', { id })
			.getRawMany();

		const hashtag = await this.dataSource
			.createQueryBuilder()
			.select('coursehash.hashtagId')
			.from(CourseHashtagEntity, 'coursehash')
			.where('courseId = :id', { id })
			.addSelect('hashtag.tag', 'tag')
			.innerJoin(HashtagEntity, 'hashtag', 'hashtag.id = coursehash.hashtagId')
			.getRawMany();
		return { course, hashtag };
	}

	async createCourse(createCourseDto: CreateCourseDto) {
		const {
			title,
			description,
			instructorId,
			category1Id,
			category2Id,
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
				instructorId,
				category1Id,
				category2Id,
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
	}

	async updateCourseById(id: number, updateCourseDto: UpdateCourseDto) {
		const { title, description, category1Id, category2Id, difficulty } =
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
				// category1: category1,
				// category2: category2,
				difficulty,
			})
			.execute();

		if (affectedRows) {
			return { statusCode: 201, message: 'Updated' };
		} else {
			throw new NotImplementedException(
				'course.service: updateCourseById - Nothing changed.',
			);
		}
	}

	async deleteCourseById(id: number) {
		const { affected } = await this.dataSource
			.createQueryBuilder()
			.from(CourseEntity, 'course')
			.where('id = :id', { id })
			.delete()
			.execute();
		if (affected) {
			return { statusCode: 201, message: 'Deleted' };
		} else {
			throw new NotImplementedException(
				'course.service: deleteCourseById - Nothing deleted.',
			);
		}
	}
}
