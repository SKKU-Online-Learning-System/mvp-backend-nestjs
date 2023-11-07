import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtPassportStrategyConfigService } from 'src/configs/passport/jwt-passport.config.service';
import { Role } from 'src/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private jwtPassportStrategyConfigService: JwtPassportStrategyConfigService,
	) {
		super(jwtPassportStrategyConfigService.createOptions());
	}

	async validate(payload: any) {
		const { id, st_id, role } = payload;

		if (st_id) {
			return { id, st_id, role };
			// } else if (username) {
			// 	return { id, username };
		} else {
			return {
				id: null,
				st_id: null,
				role: Role.NOT_LOGGED_IN,
			};
		}
	}
}
