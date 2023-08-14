import { Transform, Type } from 'class-transformer';
import {
	IsInt,
	IsOptional,
} from 'class-validator';

export class AllCoursesDto {
	@IsOptional()
	@IsInt()
	@Type(() => Number)
	readonly page?: number = 1;

	@IsOptional()
	@IsInt()
	@Type(() => Number)
	readonly perPage?: number = 3;

}
