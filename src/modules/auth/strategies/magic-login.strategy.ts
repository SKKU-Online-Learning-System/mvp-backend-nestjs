import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { MagicLoginConfigService } from 'src/configs/passport/magic-login.config.service';
import { MailService } from 'src/modules/mail/mail.service';
import { AuthService } from '../auth.service';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(
	Strategy,
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
