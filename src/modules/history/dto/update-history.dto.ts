import { IsInt } from 'class-validator';

export class UpdateHistoryDto {
	@IsInt()
	lectureId: number;

	@IsInt()
	lastTime: number;
}
