import { IsInt, IsNumberString } from 'class-validator';

export class DeleteAnswerDto {
	@IsNumberString()
	readonly answerId: number;

	@IsInt()
	readonly userId: number;
}
