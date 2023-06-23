import { IsInt, IsString } from 'class-validator';

export class CreateCourseDto {
	@IsString()
	readonly title: string;

	@IsString()
	readonly description: string;

	@IsInt()
	readonly instructor: string;

	@IsInt()
	readonly category1Id: number;

	@IsInt()
	readonly category2Id: number;

	@IsInt()
	readonly difficulty: number;
}
