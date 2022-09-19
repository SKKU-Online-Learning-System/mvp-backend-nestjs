import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CourseEntity } from 'src/entities/course.entity';
import { Category1Entity } from 'src/entities/category1.entity';
import { Category2Entity } from 'src/entities/category2.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseHashtagEntity } from 'src/entities/course-hashtag.entity';
import { HashtagEntity } from 'src/entities/hashtag.entity';
import { UserEntity } from 'src/entities/user.entity';
import { SearchCoursesDto } from './dto/search-courses.dto';
import { SectionEntity } from 'src/entities/section.entity';
import { HttpResponse, status } from 'src/configs/etc/http-response.config';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { Question } from 'src/entities/question.entity';

@Injectable()
export class CourseService {
	constructor(
		private dataSource: DataSource,
		private enrollmentService: EnrollmentService,
	) {}

	async searchCourses(searchCoursesDto: SearchCoursesDto) {
		const { page, perPage, keyword, difficulty, category1Id, category2Id } =
			searchCoursesDto;

		let courses: any = this.dataSource
			.createQueryBuilder()
			.from(CourseEntity, 'course')
			.leftJoin(Category1Entity, 'cat1', 'cat1.id = course.category1Id')
			.leftJoin(Category2Entity, 'cat2', 'cat2.id = course.category2Id')
			.leftJoin(UserEntity, 'user', 'user.id = course.instructorId');

		if (category1Id) {
			courses = courses.where('course.category1Id = :category1Id', {
				category1Id,
			});
		}
		if (category2Id) {
			courses = courses.where('course.category2Id = :category2Id', {
				category2Id,
			});
		}
		if (keyword) {
			courses = courses.where('course.title like :keyword', {
				keyword: `%${keyword.toLowerCase()}%`,
			});
		}
		if (difficulty) {
			courses = courses.where('course.difficulty IN (:...difficulty)', {
				difficulty,
			});
		}

		const length = await courses.getCount();

		courses = await courses
			.offset(perPage * (page - 1))
			.limit(perPage)
			.select([
				'course.id AS id',
				'course.title AS title',
				'course.summary AS summary',
				'course.description AS description',
				'course.thumbnail AS thumbnail',
				'course.difficulty AS difficulty',
				'course.createdAt AS createdAt',
				'user.email AS instructor',
				'cat1.name AS category1',
				'cat2.name AS category2',
			])
			.getRawMany();

		const hashtags = await this.dataSource
			.createQueryBuilder()
			.from(CourseHashtagEntity, 'course_hashtag')
			.leftJoin(
				HashtagEntity,
				'hashtag',
				'hashtag.id = course_hashtag.hashtagId',
			)
			.select([
				'course_hashtag.id AS id',
				'course_hashtag.courseId AS courseId',
				'course_hashtag.hashtagId AS hashtagID',
				'hashtag.tag AS tag',
			])
			.getRawMany();

		courses.map((course, i, arr) => {
			course.hashtag = [];
			hashtags.map((hashtag) => {
				if (course.id === hashtag.courseId) {
					course.hashtag.push(hashtag.tag);
				}
			});
		});

		return { length, courses };
	}

	async getCategories() {
		const cat = await this.dataSource.getRepository(Category1Entity).find({
			relations: {
				category2s: true,
			},
			select: {
				id: true,
				name: true,
				category2s: {
					id: true,
					name: true,
				},
			},
		});

		return cat;
	}

	async getCourseById(courseId: number, user) {
		console.log(user);

		const course = await this.dataSource
			.getRepository(CourseEntity)
			.findOne({
				where: { id: courseId },
				relations: {
					instructor: true,
					category1: true,
					category2: true,
					hashtags: true,
				},
				select: {
					id: true,
					title: true,
					summary: true,
					description: true,
					thumbnail: true,
					difficulty: true,
					createdAt: true,
					instructor: {
						id: true,
						email: true,
						nickname: true,
					},
					category1: {
						id: true,
						name: true,
					},
					category2: {
						id: true,
						name: true,
					},
					hashtags: true,
				},
			});

		if (!user.id)
			return { ...course, is_logged_in: false, has_enrolled: false };

		if (await this.enrollmentService.checkUserEnrolled(user.id, courseId)) {
			return { ...course, is_logged_in: true, has_enrolled: true };
		} else {
			return { ...course, is_logged_in: true, has_enrolled: false };
		}

		// const course = await this.dataSource
		// 	.createQueryBuilder()
		// 	.from(CourseEntity, 'course')
		// 	.innerJoin(
		// 		Category1Entity,
		// 		'category1',
		// 		'category1.id = course.category1Id',
		// 	)
		// 	.innerJoin(
		// 		Category2Entity,
		// 		'category2',
		// 		'category2.id = course.category2Id',
		// 	)
		// 	.innerJoin(UserEntity, 'user', 'user.id = course.instructorId')
		// 	.select([
		// 		'course.id AS id',
		// 		'course.title AS title',
		// 		'course.summary AS summary',
		// 		'course.description AS description',
		// 		'course.thumbnail AS thumbnail',
		// 		'course.difficulty AS difficulty',
		// 		'course.createdAt AS createdAt',
		// 		'user.email AS instructor',
		// 		'category1.name AS category1',
		// 		'category2.name AS category2',
		// 	])
		// 	.where('course.id = :id', { id })
		// 	.getRawOne();

		// const hashtag = await this.dataSource
		// 	.createQueryBuilder()
		// 	.from(CourseHashtagEntity, 'courseHashtag')
		// 	.innerJoin(
		// 		HashtagEntity,
		// 		'hashtag',
		// 		'hashtag.id = courseHashtag.hashtagId',
		// 	)
		// 	.select(['hashtag.tag AS tag'])
		// 	.where('courseId = :id', { id })
		// 	.getRawMany();

		// hashtag.map((x, i, arr) => {
		// 	arr[i] = arr[i].tag;
		// });

		// return { ...course, hashtag };
	}

	async getPopularCourses() {
		const courses: any = await this.dataSource
			.createQueryBuilder()
			.from(CourseEntity, 'course')
			.leftJoin('course.instructor', 'instructor')
			.leftJoin('course.category1', 'category1')
			.leftJoin('course.category2', 'category2')
			.leftJoin('course.enrollments', 'enrollments')
			.loadRelationCountAndMap(
				'course.enrollmentCount',
				'course.enrollments',
			)
			.select([
				'course.id',
				'course.title',
				'course.description',
				'course.summary',
				'course.thumbnail',
				'course.difficulty',
				'course.createdAt',
				'instructor.nickname',
				'category1.name',
				'category2.name',
			])
			.getMany();

		courses.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
		return courses;
	}

	async getLecturesByCourseId(id: number) {
		const lectures = await this.dataSource
			.getRepository(SectionEntity)
			.find({
				where: {
					courseId: id,
				},
				relations: {
					lectures: true,
				},
				select: {
					id: true,
					title: true,
					lectures: {
						id: true,
						title: true,
						duration: true,
						filename: true,
						createdAt: true,
					},
				},
			});
		return lectures;
	}

	async getRecentQuestions(courseId: number) {
		const questions = await this.dataSource.getRepository(Question).find({
			where: { courseId },
			relations: {
				answers: true,
			},
			select: {
				id: true,
				title: true,
				contents: true,
				createdAt: true,
				answers: {
					id: true,
					contents: true,
					createdAt: true,
				},
			},
			order: { createdAt: 'DESC' },
			take: 3,
		});

		return questions;
	}

	async createCourse(
		createCourseDto: CreateCourseDto,
	): Promise<HttpResponse> {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.getRepository(CourseEntity)
			.insert(createCourseDto);

		if (!affectedRows) throw new InternalServerErrorException();

		return status(201);
	}

	async updateCourseById(
		id: number,
		updateCourseDto: UpdateCourseDto,
	): Promise<HttpResponse> {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.getRepository(CourseEntity)
			.update(id, updateCourseDto);

		if (!affectedRows) throw new InternalServerErrorException();

		return status(200);
	}

	async deleteCourseById(id: number): Promise<HttpResponse> {
		const { affected } = await this.dataSource
			.getRepository(CourseEntity)
			.delete(id);

		if (!affected) throw new InternalServerErrorException();

		return status(200);
	}
}
