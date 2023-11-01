// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import MagicStrategy from 'passport-magic-login';
// import { MailService } from 'src/modules/mail/mail.service';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class MagicLoginStrategy extends PassportStrategy(
// 	MagicStrategy,
// 	'magic-login',
// ) {
// 	constructor(
// 		private configService: ConfigService,
// 		private mailService: MailService,
// 		private authService: AuthService,
// 	) {
// 		super({
// 			secret: configService.get<string>('MAGIC_SECRET'),
// 			callbackUrl: 'auth/login/callback',
// 			sendMagicLink: async (destination, href) => {
// 				await mailService.sendLoginConfirmation(destination, href);
// 			},
// 			verify: (payload, callback) => {
// 				authService
// 					.magicLoginValidation(payload.destination)
// 					.then((user) => {
// 						callback(null, user, 'optional');
// 					})
// 					.catch((e) => {
// 						callback(e);
// 					});
// 			},
// 		});
// 	}

// 	success(user, info) {
// 		// verify의 callback 함수에 인자를 넣으면 success가 실행됨
// 		return;
// 	}
// }
