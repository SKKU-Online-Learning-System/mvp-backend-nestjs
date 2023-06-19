import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import MagicStrategy from 'passport-magic-login';
import { MailService } from 'src/modules/mail/mail.service';
import { AuthService } from '../auth.service';

@Injectable()
export class MagicSignupStrategy extends PassportStrategy(
	MagicStrategy,
	'magic-signup',
) {
	constructor(
		private configService: ConfigService,
		private mailService: MailService,
		private authService: AuthService,
	) {
		super({
			secret: configService.get<string>('MAGIC_SECRET'),
			callbackUrl: 'auth/signup/callback',
			sendMagicLink: async (destination, href) => {
				await mailService.sendSignupConfirmation(destination, href);
			},
			verify: (payload, callback) => {
				const { destination: email, nickname } = payload;

				authService
					.signup({ email, nickname })
					.then((user) => {
						callback(null, user);
					})
					.catch((e) => {
						callback(e);
					});
			},
		});
	}

	success(user, info) {
		return;
	}
}
