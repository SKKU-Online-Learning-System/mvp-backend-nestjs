import { IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
	@IsNumber()
	readonly questionId: number;

	@IsString()
	readonly contents: string;
}
