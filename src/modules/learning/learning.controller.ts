import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LearningService } from './learning.service';
import { CreateUserCourseDto } from './dto/create-user-course.dto';
import { DeleteUserCourseDto } from './dto/delete-user-course.dto';
import { GetUserCourseDto } from './dto/get-user-course.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiLearning } from './learning.swagger';

@ApiTags('Learning')
@Controller('learning')
export class LearningController {
	constructor(private readonly learningService: LearningService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiLearning.getLearningCourses()
	getLearningCourses(@BPU() getUserCourseDto: GetUserCourseDto) {
		return this.learningService.getLearningCourses(getUserCourseDto);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiLearning.createLearningCourse()
	createLearningCourse(@BPU() createUserCourseDto: CreateUserCourseDto) {
		return this.learningService.createLearningCourse(createUserCourseDto);
	}

	@Delete('/:courseId')
	@UseGuards(JwtAuthGuard)
	@ApiLearning.deleteLearningCourse()
	deleteLearningCourse(@BPU() deleteUserCourseDto: DeleteUserCourseDto) {
		return this.learningService.deleteLearningCourse(deleteUserCourseDto);
	}
}
