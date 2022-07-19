import { PickType } from '@nestjs/mapped-types';
import { AddUserCourseDto } from './add-user-course.dto';

export class GetUserCourseDto extends PickType(AddUserCourseDto, [
	'userId',
] as const) {}
