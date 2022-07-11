import { IsInt, IsString } from 'class-validator';

export class CreateCourseDto {
	@IsString()
	readonly title: string;

	@IsString()
	readonly description: string;

	@IsInt()
	readonly instructorId: number;

	@IsInt()
	readonly category1: number;

	@IsInt()
	readonly category2: number;

	@IsInt()
	readonly difficulty: number;
}
