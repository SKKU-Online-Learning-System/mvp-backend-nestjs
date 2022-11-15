import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [HttpModule],
	controllers: [HistoryController],
	providers: [HistoryService],
	exports: [HistoryService],
})
export class HistoryModule {}
