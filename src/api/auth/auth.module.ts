import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MagicLoginStrategy } from './strategies/magic-login.strategy';
import { MailModule } from 'src/mail/mail.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './constants';

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '60s' },
		}),
		MailModule,
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy, MagicLoginStrategy],
	exports: [AuthService],
})
export class AuthModule {}
