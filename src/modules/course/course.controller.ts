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

	@Get()
	getAllCourses() {
		return this.courseService.getAllCourses();
	}

	@Get('search')
	searchCourses(@Query() searchCoursesDto: SearchCoursesDto) {
		return this.courseService.searchCourses(searchCoursesDto);
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
	getCourseById(@Param('id') id: number) {
		return this.courseService.getCourseById(id);
	}

	@Post()
	createCourse(@Body() createCourseDto: CreateCourseDto) {
		return this.courseService.createCourse(createCourseDto);
	}

	@Put(':id')
	updateCourseById(
		@Param('id') id: number,
		@Body() updateCourseDto: UpdateCourseDto,
	) {
		return this.courseService.updateCourseById(id, updateCourseDto);
	}

	@Delete(':id')
	deleteCourseById(@Param('id') id: number) {
		return this.courseService.deleteCourseById(id);
	}
}
