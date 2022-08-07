import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import {
	ImageMulterOptions,
	VideoMulterOptions,
} from './constants/multer.options';
import { CreateVideoDto } from './dto/create-video.dto';
import { FileService } from './file.service';
import { ApiFile } from './file.swagger';

@ApiTags('File')
@Controller('file')
export class FileController {
	constructor(private fileService: FileService) {}

	@Get('/video/lecture/:lectureId')
	@ApiFile.getVideo()
	async getVideo(@Param('lectureId', ParseIntPipe) lectureId) {
		return await this.fileService.getVideo(lectureId);
	}

	@Post('/video/upload')
	@ApiFile.createVideo()
	@UseInterceptors(FileInterceptor('video', VideoMulterOptions))
	createVideo(
		@UploadedFile() file: Express.Multer.File,
		@Body() createVideoDto: CreateVideoDto,
	) {
		console.log(file);
		return this.fileService.createVideo(createVideoDto);
	}

	@Delete('video/lecture/:lectureId')
	@ApiFile.deleteVideo()
	deleteVideo(@Param('lectureId', ParseIntPipe) lectureId) {
		return this.fileService.deleteVideo(lectureId);
	}

	@Get('/image/course/:courseId')
	@ApiFile.getCourseImage()
	getCourseImage(@Param('courseId', ParseIntPipe) courseId) {
		return this.fileService.getCourseImage(courseId);
	}

	@Patch('/image/course/:courseId')
	@ApiFile.updateCourseImage()
	@UseInterceptors(FileInterceptor('image', ImageMulterOptions('courses')))
	updateCourseImage(
		@Param('courseId', ParseIntPipe) courseId,
		@UploadedFile() file: Express.Multer.File,
	) {
		return this.fileService.updateCourseImage(courseId, file);
	}

	@Delete('image/course/:courseId')
	@ApiFile.deleteCourseImage()
	deleteCourseImage(@Param('courseId', ParseIntPipe) courseId) {
		return this.fileService.deleteCourseImage(courseId);
	}
}
