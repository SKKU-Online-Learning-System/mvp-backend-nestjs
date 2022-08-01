import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtPassportStrategyConfigService } from 'src/configs/passport/jwt-passport.config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private jwtPassportStrategyConfigService: JwtPassportStrategyConfigService,
	) {
		super(jwtPassportStrategyConfigService.createJwtPassportOptions());
	}

	async validate(payload: any) {
		const { id, email, username, privilege } = payload;

		if (email) {
			return { id, email, privilege };
		} else if (username) {
			return { id, username };
		} else {
			return null;
		}
	}
}
