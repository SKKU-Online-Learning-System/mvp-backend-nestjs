import { IsInt, IsNumberString, IsString } from 'class-validator';

export class CreateAnswerDto {
	@IsNumberString()
	readonly questionId: number;

	@IsInt()
	readonly userId: number;

	@IsString()
	readonly contents: string;
}
