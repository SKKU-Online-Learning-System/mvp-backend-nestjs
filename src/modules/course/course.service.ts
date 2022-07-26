import { Injectable, NotImplementedException } from '@nestjs/common';
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
import { LearningEntity } from 'src/entities/learning.entity';
import { CompleteEntity } from 'src/entities/complete.entity';
import { SectionEntity } from 'src/entities/section.entity';

@Injectable()
export class CourseService {
	constructor(private dataSource: DataSource) {}

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

		courses = await courses
			.offset(perPage * (page - 1))
			.limit(perPage)
			.select([
				'course.id AS id',
				'course.title AS title',
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

		return courses;
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

	async getCourseById(id: number) {
		const course = await this.dataSource
			.createQueryBuilder()
			.from(CourseEntity, 'course')
			.innerJoin(
				Category1Entity,
				'category1',
				'category1.id = course.category1Id',
			)
			.innerJoin(
				Category2Entity,
				'category2',
				'category2.id = course.category2Id',
			)
			.innerJoin(UserEntity, 'user', 'user.id = course.instructorId')
			.select([
				'course.id AS id',
				'course.title AS title',
				'course.description AS description',
				'course.thumbnail AS thumbnail',
				'course.difficulty AS difficulty',
				'course.createdAt AS createdAt',
				'user.email AS instructor',
				'category1.name AS category1',
				'category2.name AS category2',
			])
			.where('course.id = :id', { id })
			.getRawOne();

		const hashtag = await this.dataSource
			.createQueryBuilder()
			.from(CourseHashtagEntity, 'courseHashtag')
			.innerJoin(
				HashtagEntity,
				'hashtag',
				'hashtag.id = courseHashtag.hashtagId',
			)
			.select(['hashtag.tag AS tag'])
			.where('courseId = :id', { id })
			.getRawMany();

		hashtag.map((x, i, arr) => {
			arr[i] = arr[i].tag;
		});

		return { ...course, hashtag };
	}

	async getPopularCourses() {
		const learningNumbers = await this.dataSource
			.createQueryBuilder()
			.from(LearningEntity, 'learning')
			.select([
				'learning.courseId AS courseId',
				'COUNT(learning.courseId) AS count',
			])
			.groupBy('learning.courseId')
			.getRawMany();

		const learningNumbersMap = new Map();
		learningNumbers.forEach((element) => {
			learningNumbersMap.set(element.courseId, Number(element.count));
		});

		const completeNumbers = await this.dataSource
			.createQueryBuilder()
			.from(CompleteEntity, 'complete')
			.select([
				'complete.courseId AS courseId',
				'COUNT(complete.courseId) AS count',
			])
			.groupBy('complete.courseId')
			.getRawMany();

		const completeNumbersMap = new Map();
		completeNumbers.forEach((element) => {
			completeNumbersMap.set(element.courseId, Number(element.count));
		});

		const userCourseNumbersMap = new Map(learningNumbersMap);

		for (const [
			courseIdOfCompleteNumbers,
			countOfCompleteNumbers,
		] of completeNumbersMap) {
			const count = userCourseNumbersMap.get(courseIdOfCompleteNumbers);
			if (count) {
				userCourseNumbersMap.set(
					courseIdOfCompleteNumbers,
					count + countOfCompleteNumbers,
				);
			} else {
				userCourseNumbersMap.set(
					courseIdOfCompleteNumbers,
					countOfCompleteNumbers,
				);
			}
		}

		const userCourseNumbersArray = [...userCourseNumbersMap].sort(
			(a, b) => b[1] - a[1],
		);

		return userCourseNumbersArray.reduce((accumulator, currentValue) => {
			accumulator = [
				...accumulator,
				{ courseId: currentValue[0], count: currentValue[1] },
			];
			return accumulator;
		}, []);
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
					courseId: true,
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
