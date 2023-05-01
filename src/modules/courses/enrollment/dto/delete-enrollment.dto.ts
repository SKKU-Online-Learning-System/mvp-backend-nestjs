import { Type } from 'class-transformer';
import { IsInt, IsNumberString } from 'class-validator';

export class DeleteEnrollmentDto {
	// user
	@IsInt()
	readonly userId: number;

	// path
	@IsNumberString()
	readonly courseId: number;
}
