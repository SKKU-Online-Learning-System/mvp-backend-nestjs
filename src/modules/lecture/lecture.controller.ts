import { Controller, Param, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { LectureService } from './lecture.service';

@ApiTags('/lectures')
@Controller('lectures')
export class LectureController {
    constructor(private lectureService: LectureService) {}

    @Get(':lectureId')
    getLecturePathByLectureId(@Param('lectureId') id : number) {
        return this.lectureService.getLecturePathByLectureId(id);
    }

    @Get('testS3Video')
    getLecturePathForTest(@Param('lectureId') id: number) {
        return this.lectureService.getLecturePathForTest(id);
    }
    
    @Post('upload/:lectureId')
    @UseInterceptors(
        FileInterceptor('video'),
    )
    upload(@UploadedFile() file) {
        const response = {
            originalName: file.originalName,
            filenName: file.fileName,
        };
        return response;
    }
}
