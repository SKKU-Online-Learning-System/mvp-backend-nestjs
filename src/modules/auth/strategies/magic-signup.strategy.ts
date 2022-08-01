import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import MagicStrategy from 'passport-magic-login';
import { MagicSignupConfigService } from 'src/configs/passport/magic-signup.config.service';

@Injectable()
export class MagicSignupStrategy extends PassportStrategy(
	MagicStrategy,
	'magic-signup',
) {
	constructor(private magicSignupConfigService: MagicSignupConfigService) {
		super(magicSignupConfigService.createMagicSignupOptions());
	}

	success(user, info) {
		return;
	}
}
