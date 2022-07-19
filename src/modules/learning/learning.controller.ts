import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LearningService } from './learning.service';
import { CreateUserCourseDto } from './dto/create-user-course.dto';
import { DeleteUserCourseDto } from './dto/delete-user-course.dto';
import { GetUserCourseDto } from './dto/get-user-course.dto';

@Controller('learning')
export class LearningController {
	constructor(private readonly learningService: LearningService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	getCoursesRegistered(@BPU() getUserCourseDto: GetUserCourseDto) {
		return this.learningService.getLearningCourses(getUserCourseDto);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	addUserCourse(@BPU() createUserCourseDto: CreateUserCourseDto) {
		return this.learningService.createLearningCourse(createUserCourseDto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:courseId')
	deleteUserCourse(@BPU() deleteUserCourseDto: DeleteUserCourseDto) {
		return this.learningService.deleteLearningCourse(deleteUserCourseDto);
	}
}
