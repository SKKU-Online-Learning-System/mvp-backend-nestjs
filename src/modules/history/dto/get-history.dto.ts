import { IsInt, IsNumberString } from 'class-validator';

export class GetHistoryDto {
	@IsInt()
	readonly userId: number;

	@IsNumberString()
	readonly lectureId?: number;
}
