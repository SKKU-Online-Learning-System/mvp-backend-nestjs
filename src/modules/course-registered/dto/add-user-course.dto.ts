import { IsInt } from 'class-validator';

export class AddUserCourseDto {
	@IsInt()
	readonly userId: number;

	@IsInt()
	readonly courseId: number;
}
