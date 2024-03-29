import {
	Controller,
	Delete,
	Get,
	Post,
	Put,
	Param,
	Body,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/configs/decorator/user.decorator';
import { RolesGuard } from 'src/configs/guards/roles.guard';
import { CourseService } from './course.service';
import { ApiCourse } from './course.swagger';
import { CreateCourseDto } from './dto/create-course.dto';
import { SearchCoursesDto } from './dto/search-courses.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UpdateOperateDto } from './dto/update-operate.dto';

@ApiTags('Course')
@Controller('courses')
export class CourseController {
	constructor(private courseService: CourseService) {}

	// 최근 한달 안에 업로드 된 강좌 조회
	@Get('recent')
	@ApiCourse.getRecentlyUploadedCourses()
	getRecentlyUploadedCourses() {
		return this.courseService.getRecentlyUploadedCourses();
	}

	@Get('all')
	@ApiCourse.getAllCourses()
	getAllCourses() {
		return this.courseService.getAllCourses();
	}

	@Get('search')
	@ApiCourse.searchCourses()
	searchCourses(@Query() searchCoursesDto: SearchCoursesDto) {
		return this.courseService.searchCourses(searchCoursesDto);
	}

	@Get('adminSearch/:searchKey')
	@ApiCourse.adminSearchCourses()
	adminSearchCourses(@Param('searchKey') searchKey: string) {
		return this.courseService.adminSearchCourses(searchKey);
	}

	@Get('categories')
	@ApiCourse.getCategories()
	getCategories() {
		return this.courseService.getCategories();
	}

	// @Get('popular')
	// @ApiCourse.getPopularCourse()
	// getPopularCourses() {
	// 	return this.courseService.getPopularCourses();
	// }

	@Get(':courseId')
	@ApiCourse.getCourseById()
	@UseGuards(RolesGuard())
	getCourseById(@Param('courseId') courseId: number, @User() user) {
		return this.courseService.getCourseById(courseId, user);
	}

	@Get(':courseId/lectures')
	@ApiCourse.getLecturesByCourseId()
	getLecturesByCourseId(@Param('courseId') courseId: number) {
		return this.courseService.getLecturesByCourseId(courseId);
	}

	@Get(':courseId/recent-questions')
	@ApiCourse.getRecentQuestions()
	getRecentQuestions(@Param('courseId') courseId: number) {
		return this.courseService.getRecentQuestions(courseId);
	}

	@Put(':courseId/operate')
	@ApiCourse.updateCourseById()
  	async updateCourseOperate(@Param('courseId') courseId: number) {
    	return this.courseService.updateCourseOperate(courseId);
  	}

	// @Put(':courseId')
	// @ApiCourse.updateCourseById()
	// updateCourseById(
	// 	@Param('courseId') courseId: number,
	// 	@Body() updateCourseDto: UpdateCourseDto,
	// ) {
	// 	return this.courseService.updateCourseById(courseId, updateCourseDto);
	// }

	@Delete(':courseId')
	@ApiCourse.deleteCourseById()
	deleteCourseById(@Param('courseId') courseId: number) {
		return this.courseService.deleteCourseById(courseId);
	}

}
