import {
	Controller,
	Param,
	Get,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { LectureService } from './lecture.service';

@ApiTags('Lecture')
@Controller('lectures')
export class LectureController {
	constructor(private lectureService: LectureService) {}

	@Get('count')
	getAllLecturesGroupByCourse() {
		return this.lectureService.getAllLecturesGroupByCourse();
	}

	@Get(':lectureId')
	getLecturePathByLectureId(@Param('lectureId') id: number) {
		return this.lectureService.getLecturePathByLectureId(id);
	}
}
