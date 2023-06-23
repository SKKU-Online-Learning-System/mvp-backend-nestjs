import { OmitType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends OmitType(CreateCourseDto, [
	'instructor',
] as const) {}
