import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CourseDoneService } from './course-done.service';
import { AddUserCourseDto } from './dto/add-user-course.dto';
import { DeleteUserCourseDto } from './dto/delete-user-course.dto';
import { GetUserCourseDto } from './dto/get-user-course.dto';

@Controller('courses-done')
export class CourseDoneController {
	constructor(private readonly courseDoneService: CourseDoneService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	getCoursesRegistered(@BPU() getUserCourseDto: GetUserCourseDto) {
		return this.courseDoneService.getCoursesDone(getUserCourseDto);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	addUserCourse(@BPU() addUserCourseDto: AddUserCourseDto) {
		return this.courseDoneService.addCourseDone(addUserCourseDto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:courseId')
	deleteUserCourse(@BPU() deleteUserCourseDto: DeleteUserCourseDto) {
		return this.courseDoneService.deleteCourseDone(deleteUserCourseDto);
	}
}
