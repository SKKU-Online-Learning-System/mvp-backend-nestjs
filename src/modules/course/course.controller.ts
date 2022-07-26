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
import { CreateCourseDto } from './dto/create-course.dto';
import { SearchCoursesDto } from './dto/search-courses.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('/courses')
@Controller('courses')
export class CourseController {
	constructor(private courseService: CourseService) {}

	@Get('search')
	searchCourses(@Query() searchCoursesDto: SearchCoursesDto) {
		return this.courseService.searchCourses(searchCoursesDto);
	}

	@Get('categories')
	getCategories() {
		return this.courseService.getCategories();
	}

	@Get(':courseId')
	getCourseById(@Param('courseId') courseId: number) {
		return this.courseService.getCourseById(courseId);
	}

	@Get(':courseId/lectures')
	getLecturesByCourseId(@Param('courseId') courseId: number) {
		return this.courseService.getLecturesByCourseId(courseId);
	}

	@Post()
	createCourse(@Body() createCourseDto: CreateCourseDto) {
		return this.courseService.createCourse(createCourseDto);
	}

	@Put(':courseId')
	updateCourseById(
		@Param('courseId') courseId: number,
		@Body() updateCourseDto: UpdateCourseDto,
	) {
		return this.courseService.updateCourseById(courseId, updateCourseDto);
	}

	@Delete(':courseId')
	deleteCourseById(@Param('courseId') courseId: number) {
		return this.courseService.deleteCourseById(courseId);
	}
}
