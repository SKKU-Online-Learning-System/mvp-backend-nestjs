import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { HistoryEntity } from 'src/entities/history.entity';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
	constructor(private historyService: HistoryService) {}

	@Get('/user/:userId')
	getHistories(@Param('userId') userId: number): Promise<HistoryEntity[]> {
		return this.historyService.getHistories(userId);
	}

	@Get('user/:userId/lecture/:lectureId')
	getLectureHistory(
		@Param('userId') userId: number,
		@Param('lectureId') lectureId: number,
	): Promise<HistoryEntity[]> {
		return this.historyService.getHistories(userId, lectureId);
	}

	// @Post()
	// createHistory() {}

	// @Delete('user/:userId/lecture/:lectureId')
	// deleteHistory() {}
}
