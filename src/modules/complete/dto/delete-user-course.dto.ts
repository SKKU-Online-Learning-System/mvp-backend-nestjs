import { IsInt, IsNumberString } from 'class-validator';

export class DeleteUserCourseDto {
	@IsInt()
	userId: number;

	@IsNumberString()
	courseId: number;
}
