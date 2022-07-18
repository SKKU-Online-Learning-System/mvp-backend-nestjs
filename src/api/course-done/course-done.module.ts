import { Module } from '@nestjs/common';
import { CourseDoneService } from './course-done.service';
import { CourseDoneController } from './course-done.controller';

@Module({
  providers: [CourseDoneService],
  controllers: [CourseDoneController]
})
export class CourseDoneModule {}
