import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
	@IsInt()
	readonly authorId: number;

	@IsInt()
	readonly courseId: number;

	@IsInt()
	@IsOptional()
	readonly lectureId?: number;

	@IsString()
	readonly contents: string;
}
