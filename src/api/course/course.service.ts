import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseDto } from './dto/course.dto';
import { CourseEntity } from 'src/entities/course.entity';
import { Cat1Entity } from 'src/entities/cat1.entity';
import { Cat2Entity } from 'src/entities/cat2.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CourseHashtagEntity } from 'src/entities/course-hashtag.entity';
import { HashtagEntity } from 'src/entities/hashtag.entity';
import { LectureEntity } from 'src/entities/lecture.entity';
@Injectable()
export class CourseService {
	constructor(
		@InjectRepository(CourseEntity)
		private courseEntity: Repository<CourseEntity>,
		@InjectRepository(Cat1Entity)
		private cat1Entity: Repository<Cat1Entity>,
		@InjectRepository(Cat2Entity)
		private cat2Entity: Repository<Cat2Entity>,
		@InjectRepository(CourseHashtagEntity)
		private courseHashtagEntity: Repository<CourseHashtagEntity>,
		@InjectRepository(HashtagEntity)
		private hashtagEntity: Repository<HashtagEntity>,
		@InjectRepository(LectureEntity)
		private lectureEntity: Repository<LectureEntity>
	){}
	async getAllCourses() {
		const courses = await this.courseEntity
			.createQueryBuilder('course')
			.select('course.title')
			.getMany();
			return courses;
	}

	async searchCourses() {
		
		return 'courses filtered by query string';
	}

	async getCategory1() {
		const cate1 = await this.cat1Entity
			.createQueryBuilder('cat1')
			.select('cat1')
			.getMany()
		return cate1;
	}

	async getCategory2() {
		const cate2 = await this.cat2Entity
			.createQueryBuilder('cat2')
			.select('cat2')
			.getMany()
		return cate2;
	}

	async getCourseById(id: string ) {
		const exist = await this.courseEntity
			.createQueryBuilder('course')
			.select(['course.id', 'course.title', 'course.description', 
			'course.thumbnail', 'course.difficulty', 'course.created_at'])
			.addSelect('user.email', 'instructor_name')
			.addSelect('cat1.name', 'cat1_name')
			.addSelect('cat2.name', 'cat2_name')
			.innerJoin(Cat1Entity, 'cat1', 'cat1.id = course.cat1_id')
			.innerJoin(Cat2Entity, 'cat2', 'cat2.id = course.cat2_id')
			.innerJoin(UserEntity, 'user', 'user.id = course.instructor_id')
			.where("course.id = :id", { id })
			.getRawMany()

		const hashtag = await this.courseHashtagEntity
			.createQueryBuilder('coursehash')
			.select('coursehash.hashtag_id')
			.where("course_id = :id", {id})
			.addSelect('hashtag.tag', 'tag')
			.innerJoin(HashtagEntity, 'hashtag', 'hashtag.id = coursehash.id')
			.getRawMany()
		return [exist, hashtag];
	}

	async createCourse({title, description, instroctorId, category1, category2, difficulty}: CourseDto) {
		await this.courseEntity 
			.createQueryBuilder('course')
			.insert()
			.values({
				title, 
				description,
				instructor_id : instroctorId,
				cat1_id : category1,
				cat2_id : category2,
				difficulty,
			})
			.execute();
		return 'create course'; //
	}

	updateCourseById(id : string, {title, description, category1, category2, difficulty}: CourseDto ) {
		const inputCourse = this.courseEntity
		//변수 받아오기 수정 아래로 
		//controller에서 body로 받는 정보와 param으로 받는 정보를 한번에 
			.createQueryBuilder('course')
			.where("id = :id", {id})
			.update({
				title, 
				description,
				cat1_id: category1,
				cat2_id : category2,
				difficulty
			})
			.execute()
		return 'update course'; //
	}

	deleteCourseById(id: string) {
		//성공적으로 지워졌는지 확인 후 return 
		const targetCourse = this.courseEntity
			.createQueryBuilder('course')
			.where("id = :id", {id})
			.delete()
			.execute()

		const targetLecture = this.lectureEntity
			.createQueryBuilder('lecture')
			.where("course_id = :id", {id})
			.delete()
			.execute()
		//return targetCourse;
	}
}
