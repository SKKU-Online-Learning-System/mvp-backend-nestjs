import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompleteService } from './complete.service';
import { ApiComplete } from './complete.swagger';
import { CreateUserCourseDto } from './dto/create-user-course.dto';
import { DeleteUserCourseDto } from './dto/delete-user-course.dto';
import { GetUserCourseDto } from './dto/get-user-course.dto';

@ApiTags('Complete')
@Controller('complete')
export class CompleteController {
	constructor(private readonly completeService: CompleteService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiComplete.getCompleteCourses()
	getCompletedCourses(@BPU() getUserCourseDto: GetUserCourseDto) {
		return this.completeService.getCompletedCourses(getUserCourseDto);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiComplete.createCompletedCourse()
	createCompletedCourse(@BPU() createUserCourseDto: CreateUserCourseDto) {
		return this.completeService.createCompletedCourse(createUserCourseDto);
	}

	@Delete('/:courseId')
	@UseGuards(JwtAuthGuard)
	@ApiComplete.deleteCompletedCourse()
	deleteCompletedCourse(@BPU() deleteUserCourseDto: DeleteUserCourseDto) {
		return this.completeService.deleteCompletedCourse(deleteUserCourseDto);
	}
}
