import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { JwtAuthGuard } from '../../configs/guards/jwt-auth.guard';
import { CreateOrUpdateHistoryDto } from './dto/create-or-update-history.dto';
import { GetHistoryDto } from './dto/get-history.dto';
import { HistoryService } from './history.service';
import { ApiHistory } from './history.swagger';

@ApiTags('History')
@Controller('history')
export class HistoryController {
	constructor(private historyService: HistoryService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiHistory.getHistories()
	getHistories(@BPU() getHistoryDto: GetHistoryDto) {
		return this.historyService.getHistories(getHistoryDto);
	}

	@Get('/latest')
	@UseGuards(JwtAuthGuard)
	@ApiHistory.getHistoriesLatest()
	getHistoriesLatest(@BPU() getHistoryDto: GetHistoryDto) {
		return this.historyService.getHistoriesLatest(getHistoryDto);
	}

	@Get('/lecture/:lectureId')
	@UseGuards(JwtAuthGuard)
	@ApiHistory.getLectureHistory()
	getLectureHistory(@BPU() getHistoryDto: GetHistoryDto) {
		return this.historyService.getHistories(getHistoryDto);
	}

	@Patch()
	@UseGuards(JwtAuthGuard)
	@ApiHistory.createOrUpdateHistory()
	createOrUpdateHistory(
		@BPU() createOrUpdateHistoryDto: CreateOrUpdateHistoryDto,
	) {
		return this.historyService.createOrUpdateHistory(
			createOrUpdateHistoryDto,
		);
	}
}
