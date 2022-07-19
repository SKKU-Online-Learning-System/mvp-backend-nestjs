import { Controller, Get, Patch } from '@nestjs/common';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { HistoryEntity } from 'src/entities/history.entity';
import { CreateOrUpdateHistoryDto } from './dto/create-or-update-history.dto';
import { GetHistoryDto } from './dto/get-history.dto';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
	constructor(private historyService: HistoryService) {}

	@Get()
	getHistories(
		@BPU() getHistoryDto: GetHistoryDto,
	): Promise<HistoryEntity[]> {
		return this.historyService.getHistories(getHistoryDto);
	}

	@Get('/lecture/:lectureId')
	getLectureHistory(
		@BPU() getHistoryDto: GetHistoryDto,
	): Promise<HistoryEntity[]> {
		return this.historyService.getHistories(getHistoryDto);
	}

	@Patch()
	createOrUpdateHistory(
		@BPU() createOrUpdateHistoryDto: CreateOrUpdateHistoryDto,
	) {
		this.historyService.createOrUpdateHistory(createOrUpdateHistoryDto);
	}
}
