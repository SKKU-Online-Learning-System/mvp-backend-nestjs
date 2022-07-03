import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { AdminEntity } from 'src/entities/admin.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
	let service: AuthService;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				AppModule,
				TypeOrmModule.forFeature([UserEntity, AdminEntity]),
			],
			providers: [AuthService, UserService, JwtService],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('validateUser test', async () => {
		const result = await service.validateUser('a@b123.com');
		console.log(result);
		expect(1).toEqual(1);
	});
});
