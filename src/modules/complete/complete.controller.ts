import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompleteService } from './complete.service';
import { CreateUserCourseDto } from './dto/create-user-course.dto';
import { DeleteUserCourseDto } from './dto/delete-user-course.dto';
import { GetUserCourseDto } from './dto/get-user-course.dto';

@Controller('complete')
export class CompleteController {
	constructor(private readonly completeService: CompleteService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	getCompletedCourses(@BPU() getUserCourseDto: GetUserCourseDto) {
		return this.completeService.getCompletedCourses(getUserCourseDto);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	createCompletedCourse(@BPU() createUserCourseDto: CreateUserCourseDto) {
		return this.completeService.createCompletedCourse(createUserCourseDto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:courseId')
	deleteCompletedCourse(@BPU() deleteUserCourseDto: DeleteUserCourseDto) {
		return this.completeService.deleteCompletedCourse(deleteUserCourseDto);
	}
}
