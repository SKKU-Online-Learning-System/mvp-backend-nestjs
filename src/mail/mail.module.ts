import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: 'smtp.naver.com',
				port: 587,
				secure: false,
				auth: {
					user: 'paulcjy@naver.com',
					pass: '*****',
				},
			},
			defaults: {
				from: 'SKKU MND <paulcjy@naver.com>',
			},
			template: {
				dir: `${__dirname}/templates`,
				adapter: new PugAdapter(),
				options: {
					strict: true,
				},
			},
		}),
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
