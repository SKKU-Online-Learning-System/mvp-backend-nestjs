import { Module } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
	imports: [MulterModule.register({
		dest: './uploads',
	})],
	controllers: [LectureController],
	providers: [LectureService],
})
export class LectureModule {}
