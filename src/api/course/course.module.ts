import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseEntity } from 'src/entities/course.entity';
import { Cat1Entity } from 'src/entities/cat1.entity';
import { Cat2Entity } from 'src/entities/cat2.entity';
import { CourseHashtagEntity } from 'src/entities/course-hashtag.entity';
import { HashtagEntity } from 'src/entities/hashtag.entity';
import {LectureEntity } from 'src/entities/lecture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, Cat1Entity, Cat2Entity, CourseHashtagEntity ,HashtagEntity, LectureEntity])],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
