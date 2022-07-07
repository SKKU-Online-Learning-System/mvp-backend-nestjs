import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CourseService } from './course.service';

describe('CourseService', () => {
	let service: CourseService;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			providers: [CourseService],
		}).compile();

		service = module.get<CourseService>(CourseService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
