import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Res,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ImageMulterOptions,
	VideoMulterOptions,
} from './constants/multer.options';
import { CreateVideoDto } from './dto/create-video.dto';
import { FileService } from './file.service';
@Controller('file')
export class FileController {
	constructor(private fileService: FileService) {}

	@Get('/video/lecture/:lectureId')
	async getVideo(@Res() res, @Param('lectureId', ParseIntPipe) lectureId) {
		res.set({ 'Content-Type': 'video/mp4' });
		const file = await this.fileService.getVideo(lectureId);
		file.pipe(res);
	}

	@Post('/video/upload')
	@UseInterceptors(FileInterceptor('video', VideoMulterOptions))
	createVideo(
		@UploadedFile() file: Express.Multer.File,
		@Body() createVideoDto: CreateVideoDto,
	) {
		console.log(file);
		return this.fileService.createVideo(createVideoDto);
	}

	@Get('/image/course/:courseId')
	getCourseImage(@Param('courseId', ParseIntPipe) courseId) {
		return this.fileService.getCourseImage(courseId);
	}

	@Patch('/image/course/:courseId')
	@UseInterceptors(FileInterceptor('image', ImageMulterOptions('courses')))
	updateCourseImage(
		@Param('courseId', ParseIntPipe) courseId,
		@UploadedFile() file: Express.Multer.File,
	) {
		return this.fileService.updateCourseImage(courseId, file);
	}
}
