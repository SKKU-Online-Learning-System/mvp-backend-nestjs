import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
	getAllCourses() {
		return 'all courses';
	}

	searchCourses() {
		return 'courses filtered by query string';
	}

	getCategory1() {
		return 'category 1';
	}

	getCategory2() {
		return 'category 2';
	}

	getCourseById() {
		return 'course by id';
	}

	createCourse() {
		return 'create course';
	}

	updateCourseById() {
		return 'update course';
	}

	deleteCourseById() {
		return 'delete course';
	}
}
