import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPassportStrategyConfigService } from 'src/configs/passport/jwt-passport.config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private jwtPassportStrategyConfigService: JwtPassportStrategyConfigService,
	) {
		super(jwtPassportStrategyConfigService.createJwtPassportOptions());
	}

	async validate(payload: any) {
		if (payload.email) {
			return { id: payload.id, email: payload.email };
		} else if (payload.username) {
			return { id: payload.id, username: payload.username };
		} else {
			return null;
		}
	}
}
