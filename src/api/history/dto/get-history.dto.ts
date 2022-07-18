import { IsNumberString } from 'class-validator';

export class GetHistoryDto {
	@IsNumberString()
	readonly userId: number;

	@IsNumberString()
	readonly lectureId?: number;
}
