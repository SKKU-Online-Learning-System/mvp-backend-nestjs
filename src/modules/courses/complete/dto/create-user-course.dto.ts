import { IsInt } from 'class-validator';

export class CreateUserCourseDto {
	@IsInt()
	readonly userId: number;

	@IsInt()
	readonly courseId: number;
}
