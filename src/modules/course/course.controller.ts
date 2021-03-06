import {
	Controller,
	Delete,
	Get,
	Post,
	Put,
	Param,
	Body,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { ApiCourse } from './course.swagger';
import { CreateCourseDto } from './dto/create-course.dto';
import { SearchCoursesDto } from './dto/search-courses.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('Course')
@Controller('courses')
export class CourseController {
	constructor(private courseService: CourseService) {}

	@Get('search')
	@ApiCourse.searchCourses()
	searchCourses(@Query() searchCoursesDto: SearchCoursesDto) {
		return this.courseService.searchCourses(searchCoursesDto);
	}

	@Get('categories')
	@ApiCourse.getCategories()
	getCategories() {
		return this.courseService.getCategories();
	}

	@Get('popular')
	@ApiCourse.getPopularCourse()
	getPopularCourses() {
		return this.courseService.getPopularCourses();
	}

	@Get(':courseId')
	@ApiCourse.getCourseById()
	getCourseById(@Param('courseId') courseId: number) {
		return this.courseService.getCourseById(courseId);
	}

	@Get(':courseId/lectures')
	@ApiCourse.getLecturesByCourseId()
	getLecturesByCourseId(@Param('courseId') courseId: number) {
		return this.courseService.getLecturesByCourseId(courseId);
	}

	@Post()
	@ApiCourse.createCourse()
	createCourse(@Body() createCourseDto: CreateCourseDto) {
		return this.courseService.createCourse(createCourseDto);
	}

	@Put(':courseId')
	@ApiCourse.updateCourseById()
	updateCourseById(
		@Param('courseId') courseId: number,
		@Body() updateCourseDto: UpdateCourseDto,
	) {
		return this.courseService.updateCourseById(courseId, updateCourseDto);
	}

	@Delete(':courseId')
	@ApiCourse.deleteCourseById()
	deleteCourseById(@Param('courseId') courseId: number) {
		return this.courseService.deleteCourseById(courseId);
	}
}
