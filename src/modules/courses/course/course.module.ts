import { Module } from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseEntity } from 'src/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([CourseEntity])],  // <-- here
	controllers: [CourseController],
	providers: [CourseService, EnrollmentService],
	exports: [CourseService],
})
export class CourseModule {}

export { CourseService };
