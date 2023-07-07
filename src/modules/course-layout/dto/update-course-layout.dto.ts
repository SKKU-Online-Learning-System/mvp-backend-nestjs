import { PartialType } from '@nestjs/swagger';
import { CreateCourseLayoutDto } from './create-course-layout.dto';

export class UpdateCourseLayoutDto {
    readonly courseId?: number;
    readonly thumbnailLink?: string;
    readonly sequence?: number;
    readonly category?: string;
    readonly order?: number;
}