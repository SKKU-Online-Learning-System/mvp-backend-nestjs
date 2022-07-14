import { IsInt, IsNumberString } from 'class-validator';

export class DeleteQuestionDto {
	@IsNumberString()
	readonly questionId: number;

	@IsInt()
	readonly userId: number;
}
