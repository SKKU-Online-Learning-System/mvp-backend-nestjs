import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './login.service';
import { UserModule } from '../user/user.module';
import { LoginController } from './login.controller';
import { JwtStrategyConfigService } from 'src/configs/passport/jwt.config.service';
import { JwtPassportStrategyConfigService } from 'src/configs/passport/jwt-passport.config.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtStrategyConfigService,
    }),
    UserModule,
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    JwtPassportStrategyConfigService,
  ],
  exports: [LoginService],
})
export class LoginModule {}
