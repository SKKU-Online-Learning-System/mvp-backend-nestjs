import { Type } from 'class-transformer';
import { IsInt, IsNumberString, IsOptional, IsString } from 'class-validator';

export class SearchCoursesDto {
	@IsOptional()
	@IsInt()
	@Type(() => Number)
	readonly page?: number = 1;

	@IsOptional()
	@IsInt()
	@Type(() => Number)
	readonly perPage?: number = 24;

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
