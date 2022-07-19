import { Module } from '@nestjs/common';
import { CourseDoneService } from './complete.service';
import { CourseDoneController } from './complete.controller';

@Module({
	providers: [CourseDoneService],
	controllers: [CourseDoneController],
})
export class CourseDoneModule {}
