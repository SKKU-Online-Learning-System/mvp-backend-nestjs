import { IsString } from 'class-validator';

export class CreateAnswerDto {
	@IsString()
	readonly contents: string;
}
