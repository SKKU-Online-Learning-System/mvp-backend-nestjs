import { IsInt, IsNumberString, IsString } from 'class-validator';

export class UpdateAnswerDto {
	@IsNumberString()
	readonly answerId: number;

	@IsInt()
	readonly userId: number;

	@IsString()
	readonly contents: string;
}
