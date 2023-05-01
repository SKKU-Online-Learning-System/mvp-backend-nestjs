import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetHashtagDto {
	@IsInt()
	@Type(() => Number)
	readonly hashtagId: number;
}
