import {
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
	constructor(private historyService: HistoryService) {}

	@Get('/user/:userId')
	getHistories(@Param('userId', ParseIntPipe) userId) {
		return this.historyService.getHistories(userId);
	}

	@Get('user/:userId/lecture/:lectureId')
	getLectureHistory(
		@Param('userId', ParseIntPipe) userId,
		@Param('lectureId', ParseIntPipe) lectureId,
	) {
		return this.historyService.getHistories(userId, lectureId);
	}

	// @Post()
	// createHistory() {}

	// @Delete('user/:userId/lecture/:lectureId')
	// deleteHistory() {}
}
