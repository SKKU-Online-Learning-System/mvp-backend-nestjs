import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
//import { MagicLoginStrategy } from './strategies/magic-login.strategy';
import { MailModule } from 'src/modules/mail/mail.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
// import { AdminModule } from '../admin/admin.module';
import { JwtStrategyConfigService } from 'src/configs/passport/jwt.config.service';
import { JwtPassportStrategyConfigService } from 'src/configs/passport/jwt-passport.config.service';
//import { MagicSignupStrategy } from './strategies/magic-signup.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			useClass: JwtStrategyConfigService,
		}),
		UserModule,
		// AdminModule,
		MailModule,
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		// LocalStrategy,
		JwtStrategy,
		//MagicLoginStrategy,
		//MagicSignupStrategy,
		JwtPassportStrategyConfigService,
	],
	exports: [AuthService],
})
export class AuthModule {}
