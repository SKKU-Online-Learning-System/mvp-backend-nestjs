import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';

@Injectable()
export class JwtPassportStrategyConfigService {
	constructor(
		private configService: ConfigService,
		private jwtService: JwtService,
	) {}

	createOptions(): StrategyOptions {
		return {
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					return req?.cookies?.Authorization;
				},
				() => {
					return this.jwtService.sign({});
				},
			]),
			ignoreExpiration: false,
			secretOrKey: this.configService.get<string>('JWT_SECRET'),
		};
	}
}
