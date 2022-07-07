import {
	Controller,
	Delete,
	Get,
	Post,
	Put,
	Param,
	Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';

@ApiTags('/courses')
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
	getCourseById(@Param('id') id: string) {
		return this.courseService.getCourseById(id);
	}

	@Post('create')
	createCourse(@Body() courseData: CourseDto) {
		return this.courseService.createCourse(courseData);
	}

	@Put(':id')
	updateCourseById(@Param('id') id: string, @Body() courseData: CourseDto) {
		return this.courseService.updateCourseById(id, courseData);
	}

	@Delete(':id')
	deleteCourseById(@Param('id') id: string) {
		return this.courseService.deleteCourseById(id);
	}
}
