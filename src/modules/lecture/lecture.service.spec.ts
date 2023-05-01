import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { LectureService } from './lecture.service';

describe('LectureService', () => {
	let service: LectureService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			providers: [LectureService],
		}).compile();

		service = module.get<LectureService>(LectureService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
