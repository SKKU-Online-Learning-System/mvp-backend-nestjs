import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
	let service: QuestionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			providers: [QuestionService],
		}).compile();

		service = module.get<QuestionService>(QuestionService);
	});

	it.skip('should be defined', () => {
		expect(service).toBeDefined();
	});

	it.skip('updateQuestionById', async () => {
		const result = await service.updateQuestionById({
			questionId: 3,
			userId: 1,
			contents: 'updated 2223',
		});
		console.log(result);
		expect(1).toEqual(1);
	});

	it.skip('deleteQuestionById', async () => {
		const result = await service.deleteQuestionById({
			questionId: 7,
			userId: 1,
		});
		console.log(result);
		expect(1).toEqual(1);
	});

	it.skip('getAllQuestionsByCourseId', async () => {
		const result = await service.getQuestionsByCourseId(1);
		console.log(result);
		expect(1).toEqual(1);
	});

	it.skip('getQuestionsByLectureId', async () => {
		const result = await service.getQuestionsByCourseId(1);
		console.log(result);
		expect(1).toEqual(1);
	});
});
