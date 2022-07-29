import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/modules/auth/auth.service';
import { MailService } from 'src/modules/mail/mail.service';

@Injectable()
export class MagicLoginConfigService {
	constructor(
		private configService: ConfigService,
		private mailService: MailService,
		private authService: AuthService,
	) {}

	createMagicLoginOptions() {
		return {
			secret: this.configService.get<string>('MAGIC_SECRET'),
			callbackUrl: 'auth/login/callback',
			sendMagicLink: async (destination, href) => {
				await this.mailService.sendUserConfirmation(destination, href);
			},
			verify: (payload, callback, info) => {
				this.authService
					.validateUser(payload.destination)
					.then((user) => {
						callback(null, user, 'optional');
					})
					.catch((err) => {
						callback(err);
					});
			},
		};
	}
}
