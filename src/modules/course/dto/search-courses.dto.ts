import { IsInt, IsNumberString, IsOptional, IsString } from 'class-validator';

export class SearchCoursesDto {
	@IsOptional()
	@IsNumberString()
	readonly page?: number;

	@IsOptional()
	@IsNumberString()
	readonly perPage?: number;

	@IsOptional()
	@IsString()
	readonly keyword?: string;

	@IsOptional()
	@IsString()
	readonly difficulty?: string;

	@IsOptional()
	@IsNumberString()
	readonly category1Id?: number;

	@IsOptional()
	@IsNumberString()
	readonly category2Id?: number;
}
