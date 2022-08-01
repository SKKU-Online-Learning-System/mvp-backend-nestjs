import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';

@Injectable()
export class JwtPassportStrategyConfigService {
	constructor(private configService: ConfigService) {}

	createJwtPassportOptions(): StrategyOptions {
		return {
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					return req?.cookies?.Authorization;
				},
			]),
			ignoreExpiration: false,
			secretOrKey: this.configService.get<string>('JWT_SECRET'),
		};
	}
}
