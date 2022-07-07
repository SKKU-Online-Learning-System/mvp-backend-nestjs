import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

describe('CourseController', () => {
	let controller: CourseController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			controllers: [CourseController],
			providers: [CourseService],
		}).compile();

		controller = module.get<CourseController>(CourseController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
