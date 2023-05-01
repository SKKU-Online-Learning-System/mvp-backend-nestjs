import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
	constructor(private configService: ConfigService) {}

	createMailerOptions(): MailerOptions | Promise<MailerOptions> {
		return {
			transport: {
				service: this.configService.get<string>('EMAIL_SERVICE'),
				// host: this.configService.get<string>('EMAIL_HOST'),
				// port: this.configService.get<number>('EMAIL_PORT'),
				secure: false,
				auth: {
					user: this.configService.get<string>('EMAIL_USERNAME'),
					pass: this.configService.get<string>('EMAIL_PASSWORD'),
				},
			},
			defaults: {
				from: this.configService.get<string>('EMAIL_FROM'),
			},
			template: {
				dir: `dist/modules/mail/templates`,
				adapter: new PugAdapter(),
				options: {
					strict: true,
				},
			},
		};
	}
}
