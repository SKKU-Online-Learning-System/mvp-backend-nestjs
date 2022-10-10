import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/configs/decorator/user.decorator';
import { RolesGuard } from 'src/configs/guards/roles.guard';
import { ReqUser, Role } from 'src/entities/user.entity';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { HistoryService } from './history.service';
import { ApiHistory } from './history.swagger';

@ApiTags('History')
@Controller('history')
export class HistoryController {
	constructor(private historyService: HistoryService) {}

	@Get()
	@UseGuards(RolesGuard([Role.USER]))
	@ApiHistory.getHistories()
	getByUser(@User() user: ReqUser) {
		return this.historyService.getByUser(user);
	}

	@Get('lectures/:lectureId')
	@UseGuards(RolesGuard([Role.USER]))
	getByLecture(@Param('lectureId') lectureId: number, @User() user: ReqUser) {
		return this.historyService.getByLecture(lectureId, user);
	}

	@Patch()
	@UseGuards(RolesGuard([Role.USER]))
	@ApiHistory.createOrUpdateHistory()
	update(@Body() dto: UpdateHistoryDto, @User() user: ReqUser) {
		return this.historyService.update(dto, user);
	}
}
