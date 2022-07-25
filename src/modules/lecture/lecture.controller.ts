import { Controller, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LectureService } from './lecture.service';

@ApiTags('/lectures')
@Controller('lectures')
export class LectureController {
    constructor(private lectureService: LectureService){}

    @Get(':id')
    getLecturesByCourseId(@Param('id') id:number){
        return this.lectureService.getLecturesByCourseId(id);
    }
}
