import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendUserConfirmation(userEmail: string, url: string) {
		await this.mailerService.sendMail({
			// from: mail.module 등록할 때 default로 입력함
			to: userEmail,
			subject: '온라인 명륜당 로그인',
			template: './mail',
			context: {
				// ✏️ filling curly brackets with content
				name: userEmail,
				url,
				baseUrl: 'http://localhost:3000/',
			},
		});
	}
}
