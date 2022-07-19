import { IsInt } from 'class-validator';

export class CreateOrUpdateHistoryDto {
	@IsInt()
	userId: number;

	@IsInt()
	lectureId: number;

	@IsInt()
	lastTime: number;
}
