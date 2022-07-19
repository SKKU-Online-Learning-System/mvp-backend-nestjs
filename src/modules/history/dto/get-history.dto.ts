import { IsInt, IsNumberString, IsOptional } from 'class-validator';

export class GetHistoryDto {
	@IsInt()
	readonly userId: number;

	@IsOptional()
	@IsNumberString()
	readonly lectureId?: number;
}
