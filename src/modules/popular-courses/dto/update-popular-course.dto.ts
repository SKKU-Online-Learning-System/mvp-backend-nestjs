import { PartialType } from '@nestjs/swagger';
import { CreatePopularCourseDto } from './create-popular-course.dto';

export class UpdatePopularCourseDto extends PartialType(CreatePopularCourseDto) {}
