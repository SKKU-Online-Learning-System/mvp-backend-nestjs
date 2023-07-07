import { Module } from '@nestjs/common';
import { CourseLayoutService } from './course-layout.service';
import { CourseLayoutController } from './course-layout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseLayout } from 'src/entities/course-layout.entity';
import { CourseModule } from '../courses/course/course.module';
@Module({
  imports: [CourseModule, TypeOrmModule.forFeature([CourseLayout])], 
  controllers: [CourseLayoutController],
  providers: [CourseLayoutService]
})
export class CourseLayoutModule {}
