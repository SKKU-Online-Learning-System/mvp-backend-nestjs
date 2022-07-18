import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CourseRegisteredService } from './course-registered.service';
import { AddUserCourseDto } from './dto/add-user-course.dto';
import { DeleteUserCourseDto } from './dto/delete-user-course.dto';
import { GetUserCourseDto } from './dto/get-user-course.dto';

@Controller('courses-registered')
export class CourseRegisteredController {
	constructor(
		private readonly courseRegisteredService: CourseRegisteredService,
	) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	getCoursesRegistered(@BPU() getUserCourseDto: GetUserCourseDto) {
		return this.courseRegisteredService.getCoursesRegistered(
			getUserCourseDto,
		);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	addUserCourse(@BPU() addUserCourseDto: AddUserCourseDto) {
		return this.courseRegisteredService.addUserCourse(addUserCourseDto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:courseId')
	deleteUserCourse(@BPU() deleteUserCourseDto: DeleteUserCourseDto) {
		return this.courseRegisteredService.deleteUserCourse(
			deleteUserCourseDto,
		);
	}
}
