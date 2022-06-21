import { Module } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';

@Module({
	controllers: [LectureController],
	providers: [LectureService],
})
export class LectureModule {}
