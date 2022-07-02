import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [DataSource],
			providers: [
				UserService,
				{
					provide: getRepositoryToken(UserEntity),
					useValue: {},
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	// describe('createUser', () => {
	// 	expect(1).toEqual(1);
	// });
});
