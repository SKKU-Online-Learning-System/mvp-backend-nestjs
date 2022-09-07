import { Module } from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
	controllers: [CourseController],
	providers: [CourseService, EnrollmentService],
})
export class CourseModule {}
