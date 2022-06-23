import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
	constructor(private readonly courseService: CourseService) {}

	@Get()
	getAllCourses() {
		return this.courseService.getAllCourses();
	}

	@Get('search')
	searchCourses() {
		return this.courseService.searchCourses();
	}

	@Get('cat1')
	getCat1() {
		return this.courseService.getCategory1();
	}

	@Get('cat2')
	getCat2() {
		return this.courseService.getCategory2();
	}

	@Get(':id')
	getCourseById() {
		return this.courseService.getCourseById();
	}

	@Post()
	createCourse() {
		return this.courseService.createCourse();
	}

	@Put(':id')
	updateCourseById() {
		return this.courseService.updateCourseById();
	}

	@Delete(':id')
	deleteCourseById() {
		return this.courseService.deleteCourseById();
	}
}
