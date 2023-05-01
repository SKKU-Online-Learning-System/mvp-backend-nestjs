import { IsInt, IsNumberString, IsString } from 'class-validator';

export class UpdateQuestionDto {
	@IsString()
	readonly title: string;

	@IsString()
	readonly contents: string;
}
