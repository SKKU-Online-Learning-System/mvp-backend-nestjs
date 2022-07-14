import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

describe('QuestionController', () => {
	let controller: QuestionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			controllers: [QuestionController],
			providers: [QuestionService],
		}).compile();

		controller = module.get<QuestionController>(QuestionController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
