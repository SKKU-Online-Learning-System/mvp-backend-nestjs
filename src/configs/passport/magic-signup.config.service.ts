import { ImATeapotException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/modules/auth/auth.service';
import { MailService } from 'src/modules/mail/mail.service';

@Injectable()
export class MagicSignupConfigService {
	constructor(
		private configService: ConfigService,
		private mailService: MailService,
		private authService: AuthService,
	) {}

	createMagicSignupOptions() {
		return {
			secret: this.configService.get<string>('MAGIC_SECRET'),
			callbackUrl: 'auth/signup/callback',
			sendMagicLink: async (destination, href) => {
				await this.mailService.sendSignupConfirmation(
					destination,
					href,
				);
			},
			verify: (payload, callback) => {
				const { destination: email, nickname } = payload;

				this.authService
					.signup({ email, nickname })
					.then((user) => {
						callback(null, user);
					})
					.catch((e) => {
						callback(e);
					});
			},
		};
	}
}
