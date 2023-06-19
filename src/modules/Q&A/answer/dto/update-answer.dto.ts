import { IsString } from 'class-validator';

export class UpdateAnswerDto {
	@IsString()
	readonly contents: string;
}
