import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { User } from 'src/configs/decorator/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompleteService } from './complete.service';
import { ApiComplete } from './complete.swagger';
import { CreateUserCourseDto } from './dto/create-user-course.dto';

@ApiTags('Complete')
@Controller('completed')
export class CompleteController {
	constructor(private readonly completeService: CompleteService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiComplete.getCompleteCourses()
	getCompletedEnrollments(@User() user) {
		return this.completeService.getCompletedEnrollments(user.userId);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiComplete.createCompletedCourse()
	createCompletedEnrollments(
		@BPU() createUserCourseDto: CreateUserCourseDto,
	) {
		return this.completeService.createCompletedEnrollments(
			createUserCourseDto,
		);
	}
}
