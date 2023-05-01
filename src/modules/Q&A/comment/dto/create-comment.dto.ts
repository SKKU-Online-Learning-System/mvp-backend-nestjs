import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
	@IsNumber()
	readonly answerId: number;

	@IsString()
	readonly contents: string;
}
