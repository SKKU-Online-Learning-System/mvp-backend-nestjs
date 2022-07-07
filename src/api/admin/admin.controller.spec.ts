import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

describe('AdminController', () => {
	let controller: AdminController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			controllers: [AdminController],
			providers: [AdminService],
		}).compile();

		controller = module.get<AdminController>(AdminController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
