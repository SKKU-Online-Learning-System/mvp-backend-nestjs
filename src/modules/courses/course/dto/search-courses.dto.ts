import { Transform, Type } from 'class-transformer';
import {
	IsArray,
	IsInt,
	IsNumberString,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';

export class SearchCoursesDto {
	@IsOptional()
	@IsInt()
	@Type(() => Number)
	readonly page?: number = 1;

	@IsOptional()
	@IsInt()
	@Type(() => Number)
	readonly perPage?: number = 50;

	@IsOptional()
	@IsString()
	readonly keyword?: string;

	@IsOptional()
	@IsArray()
	@Transform(({ value }) => value.split(',').map((item) => Number(item)))
	@IsInt({ each: true })
	readonly difficulty?: number[];

	@IsOptional()
	@IsNumberString()
	readonly category1Id?: number;

	@IsOptional()
	@IsNumberString()
	readonly category2Id?: number;
}
