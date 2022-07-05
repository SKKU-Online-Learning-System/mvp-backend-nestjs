import {
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { IHistory } from './interfaces/history.interface';

@Controller('history')
export class HistoryController {
	constructor(private historyService: HistoryService) {}

	@Get('/user/:userId')
	getHistories(@Param('userId', ParseIntPipe) userId): Promise<IHistory[]> {
		return this.historyService.getHistories(userId);
	}

	@Get('user/:userId/lecture/:lectureId')
	getLectureHistory(
		@Param('userId', ParseIntPipe) userId,
		@Param('lectureId', ParseIntPipe) lectureId,
	): Promise<IHistory[]> {
		return this.historyService.getHistories(userId, lectureId);
	}

	// @Post()
	// createHistory() {}

	// @Delete('user/:userId/lecture/:lectureId')
	// deleteHistory() {}
}
