import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { AdminService } from './admin.service';

describe('AdminService', () => {
	let service: AdminService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			providers: [AdminService],
		}).compile();

		service = module.get<AdminService>(AdminService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
