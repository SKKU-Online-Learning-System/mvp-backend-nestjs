import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { HistoryEntity } from 'src/entities/history.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrUpdateHistoryDto } from './dto/create-or-update-history.dto';
import { GetHistoryDto } from './dto/get-history.dto';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
	constructor(private historyService: HistoryService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	getHistories(@BPU() getHistoryDto: GetHistoryDto) {
		return this.historyService.getHistories(getHistoryDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/latest')
	getHistoriesLatest(@BPU() getHistoryDto: GetHistoryDto) {
		return this.historyService.getHistoriesLatest(getHistoryDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/lecture/:lectureId')
	getLectureHistory(@BPU() getHistoryDto: GetHistoryDto) {
		return this.historyService.getHistories(getHistoryDto);
	}

	@UseGuards(JwtAuthGuard)
	@Patch()
	createOrUpdateHistory(
		@BPU() createOrUpdateHistoryDto: CreateOrUpdateHistoryDto,
	) {
		return this.historyService.createOrUpdateHistory(
			createOrUpdateHistoryDto,
		);
	}
}
