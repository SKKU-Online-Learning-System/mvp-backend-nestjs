import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { MailModule } from 'src/mail/mail.module';
import { AdminModule } from '../admin/admin.module';
import { AdminService } from '../admin/admin.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './strategies/magic-login.strategy';

describe('AdminController', () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule, MailModule, AdminModule, UserModule],
			controllers: [AuthController],
			providers: [AuthService, JwtService, MagicLoginStrategy],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
