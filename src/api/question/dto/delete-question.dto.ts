import { IsInt } from 'class-validator';

export class DeleteQuestionDto {
	@IsInt()
	readonly userId: number;

	@IsInt()
	readonly questionId: number;
}
