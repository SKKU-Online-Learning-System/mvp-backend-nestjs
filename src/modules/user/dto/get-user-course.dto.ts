import { PickType } from '@nestjs/mapped-types';
import { CreateUserCourseDto } from './create-user-course.dto';

export class GetUserCourseDto extends PickType(CreateUserCourseDto, [
	'userId',
] as const) {}
