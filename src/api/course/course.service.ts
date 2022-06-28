import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Course } from 'src/entities/course.entity';
import { Cat1 } from 'src/entities/cat1.entity';
import { Cat2 } from 'src/entities/cat2.entity';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
	constructor(
		private dataSource: DataSource,
	){}
	async getAllCourses() {
		const courses = await this.dataSource
			.createQueryBuilder()
			.select('course.title')
			.from(Course, 'course')
			.getMany();
			return courses;
	}

	async searchCourses() {
		
		return 'courses filtered by query string';
	}

	async getCategory1() {
		const cate1 = await this.dataSource
			.createQueryBuilder()
			.from(Cat1, 'cat1')
			.select('cat1')
			.getMany()
		return cate1;
	}

	async getCategory2() {
		const cate2 = await this.dataSource
			.createQueryBuilder()
			.from(Cat2, 'cat2')
			.select('cat2')
			.getMany()
		return cate2;
	}

	async getCourseById(id: string ) {
		const exist = await this.dataSource
			.createQueryBuilder()
			.from(Course, 'course')
			.select('course')
			.where("id = :id", { id })
			.getMany()
		return exist;
	}

	async createCourse({title, description, instroctorId, category1, category2, difficulty}: CourseDto) {
		await this.dataSource 
			.createQueryBuilder()
			.insert()
			.into(Course)
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
		const inputCourse = this.dataSource
			.createQueryBuilder()
			.from(Course, 'course')
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
		const targetCourse = this.dataSource
			.createQueryBuilder()
			.from(Course, 'course')
			.where("id = :id", {id})
			.delete()
			.execute()
		//return targetCourse;
	}
}
