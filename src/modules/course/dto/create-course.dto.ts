import { IsInt, IsString } from 'class-validator';

export class CreateCourseDto {
	@IsString()
	readonly title: string;

	@IsString()
	readonly description: string;

	@IsInt()
	readonly instructorId: number;

	@IsInt()
	readonly category1Id: number;

	@IsInt()
	readonly category2Id: number;

	@IsInt()
	readonly difficulty: number;
}
