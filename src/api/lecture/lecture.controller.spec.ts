import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';

describe('LectureService', () => {
	let service: LectureService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			controllers: [LectureController],
			providers: [LectureService],
		}).compile();

		service = module.get<LectureService>(LectureService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
