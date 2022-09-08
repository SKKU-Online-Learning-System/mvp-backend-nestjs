import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
	@IsInt()
	readonly courseId: number;

	@IsInt()
	@IsOptional()
	readonly lectureId?: number;

	@IsString()
	readonly title: string;

	@IsString()
	readonly contents: string;
}
