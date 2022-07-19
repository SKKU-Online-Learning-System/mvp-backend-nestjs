import { IsInt, IsNumberString, IsString } from 'class-validator';

export class UpdateQuestionDto {
	@IsNumberString()
	readonly questionId: number;

	@IsInt()
	readonly userId: number;

	@IsString()
	readonly contents: string;
}
