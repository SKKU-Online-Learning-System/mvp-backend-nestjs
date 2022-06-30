import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendUserConfirmation(userEmail: string, url: string) {
		await this.mailerService.sendMail({
			// from: 'SKKU MND <paulcjy@naver.com>',
			to: userEmail,
			subject: 'Welcome to Nice App! Confirm your Email',
			template: './mail', // `.hbs` extension is appended automatically
			context: {
				// ✏️ filling curly brackets with content
				name: userEmail,
				url,
				baseUrl: 'http://localhost:3000/',
			},
		});
	}
}
