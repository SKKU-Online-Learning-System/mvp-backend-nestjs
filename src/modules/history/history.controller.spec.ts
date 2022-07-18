import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

describe('HistoryController', () => {
	let controller: HistoryController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			controllers: [HistoryController],
			providers: [HistoryService],
		}).compile();

		controller = module.get<HistoryController>(HistoryController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
