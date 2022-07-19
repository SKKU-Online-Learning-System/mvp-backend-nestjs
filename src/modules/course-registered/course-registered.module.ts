import { Module } from '@nestjs/common';
import { CourseRegisteredController } from './course-registered.controller';
import { CourseRegisteredService } from './course-registered.service';

@Module({
  controllers: [CourseRegisteredController],
  providers: [CourseRegisteredService]
})
export class CourseRegisteredModule {}
