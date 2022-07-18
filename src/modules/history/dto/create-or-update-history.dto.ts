import { IsNumberString } from 'class-validator';

export class CreateOrUpdateHistoryDto {
	@IsNumberString()
	userId: number;

	@IsNumberString()
	lectureId: number;

	@IsNumberString()
	lastTime: number;
}
