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
				console.log('sendMagicLink:', destination, href);
				await this.mailService.sendUserConfirmation(destination, href);
			},
			verify: (payload, callback) => {
				console.log('verify:', payload, callback);
				// this.authService
				// 	.validateUser(payload.destination)
				// 	.then((user) => {
				// 		console.log('to then', user);
				// 		callback(null, user);
				// 	})
				// 	.catch((err) => {
				// 		console.log('to err');
				// 		callback(err);
				// 	});
				callback(null, {});

				// Get or create a user with the provided email from the database
				// getOrCreateUserWithEmail(payload.destination)
				// 	.then((user) => {
				// 		callback(null, user);
				// 	})
				// 	.catch((err) => {
				// 		callback(err);
				// 	});
			},
		});
	}

	// async validate(): Promise<any> {
	// 	console.log('welcome to validate');
	// 	return { username: 'a@a.com', sub: 1 };
	// }
}
