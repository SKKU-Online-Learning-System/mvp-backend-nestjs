import { Module } from '@nestjs/common';
import { PopularCoursesService } from './popular-courses.service';
import { PopularCoursesController } from './popular-courses.controller';
import { PopularCourseEntity } from '../../entities/popular-course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from 'src/entities/course.entity';
import { EnrollmentEntity } from 'src/entities/enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PopularCourseEntity, CourseEntity, EnrollmentEntity])],
  controllers: [PopularCoursesController],
  providers: [PopularCoursesService]
})
export class PopularCoursesModule {}
