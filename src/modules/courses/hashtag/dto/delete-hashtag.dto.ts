import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class DeleteHashtagDto {
	@Type(() => Number)
	@IsInt()
	readonly hashtagId: number;
}
