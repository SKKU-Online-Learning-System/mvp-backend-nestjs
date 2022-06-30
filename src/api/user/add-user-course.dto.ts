import { IsInt } from 'class-validator';

export class AddUserCourseDto {
	@IsInt()
	courseId: number;
}
