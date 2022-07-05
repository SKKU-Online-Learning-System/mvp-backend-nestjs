import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { AdminEntity } from 'src/entities/admin.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				AppModule,
				TypeOrmModule.forFeature([UserEntity, AdminEntity]),
			],
			providers: [UserService],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it.skip('createUser returns', async () => {
		const result = await service.createUser('john@a.com12');
		console.log(result);
		expect(1).toEqual(1);
	});

	it.skip('getUser test', async () => {
		const result = await service.getUserById(3);
		expect(result.email).toEqual('a@asdf.com');
	});

	it.skip('getUserByEmail return value', async () => {
		const result = await service.getUserByEmail('asdfasdf');
		console.log(result);
	});
});
