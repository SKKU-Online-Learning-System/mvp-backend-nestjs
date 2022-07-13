import { IsInt, IsString } from 'class-validator';

export class UpdateQuestionDto {
	@IsInt()
	readonly questionId: number;

	@IsInt()
	readonly userId: number;

	@IsString()
	readonly contents: string;
}
