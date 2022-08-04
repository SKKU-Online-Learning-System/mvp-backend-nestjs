import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { User } from 'src/configs/decorator/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { DeleteEnrollmentDto } from './dto/delete-enrollment.dto';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollment')
export class EnrollmentController {
	constructor(private readonly enrollmentService: EnrollmentService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	getLearningEnrollments(@User() user) {
		return this.enrollmentService.getLearningEnrollments(user.id);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	createEnrollment(@BPU() createEnrollmentDto: CreateEnrollmentDto) {
		return this.enrollmentService.createEnrollment(createEnrollmentDto);
	}

	@Delete('course/:courseId')
	@UseGuards(JwtAuthGuard)
	deleteEnrollment(@BPU() deleteEnrollmentDto: DeleteEnrollmentDto) {
		return this.enrollmentService.deleteEnrollment(deleteEnrollmentDto);
	}
}
