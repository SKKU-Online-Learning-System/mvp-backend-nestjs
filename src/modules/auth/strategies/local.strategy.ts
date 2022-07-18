import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		// pass an options object to super() to customize passport strategy
		super();
	}

	// For the local-strategy, passport expects validate() method
	async validate(username: string, password: string): Promise<any> {
		const admin = await this.authService.validateAdmin(username, password);
		if (!admin) {
			throw new UnauthorizedException();
		}
		return admin;
	}
}
