import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			controllers: [UserController],
			providers: [UserService],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
