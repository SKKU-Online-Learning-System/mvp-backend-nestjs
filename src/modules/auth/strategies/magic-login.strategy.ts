import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import MagicStrategy from 'passport-magic-login';
import { MagicLoginConfigService } from 'src/configs/passport/magic-login.config.service';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(
	MagicStrategy,
	'magic-login',
) {
	constructor(private magicLoginConfigService: MagicLoginConfigService) {
		super(magicLoginConfigService.createMagicLoginOptions());
	}

	success(user, info) {
		// verify의 callback 함수에 인자를 넣으면 success가 실행됨
		return;
	}
}
