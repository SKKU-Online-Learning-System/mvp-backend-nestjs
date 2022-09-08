import { IsInt } from 'class-validator';

export class CreateEnrollmentDto {
	// user
	@IsInt()
	readonly userId: number;

	// body
	@IsInt()
	readonly courseId: number;
}
