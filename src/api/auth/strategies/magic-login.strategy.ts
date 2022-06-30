import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from '../auth.service';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(
	Strategy,
	'magic-login',
) {
	constructor(
		private mailService: MailService,
		private authService: AuthService,
	) {
		super({
			secret: 'helloworld',
			callbackUrl: 'auth/login/magic/callback',
			sendMagicLink: async (destination, href) => {
				await this.mailService.sendUserConfirmation(destination, href);
			},
			verify: (payload, callback, info) => {
				this.authService
					.validateUser(payload.destination)
					.then((user) => {
						console.log('to then', user);
						callback(null, user, 'optional!'); // user와 optional이 success로 감
					})
					.catch((err) => {
						console.log('to err');
						callback(err);
					});
			},
		});
	}

	success(user, info) { // verify의 callback 함수에 인자를 넣으면 success가 실행됨
		return;
	}
}
