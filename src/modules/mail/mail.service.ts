import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
	constructor(
		private mailerService: MailerService,
		private configService: ConfigService,
	) {}

	async sendLoginConfirmation(userEmail: string, url: string) {
		await this.mailerService.sendMail({
			// from: mail.module 등록할 때 default로 입력함
			to: userEmail,
			subject: '온라인 명륜당 로그인',
			template: './login',
			context: {
				// ✏️ filling curly brackets with content
				name: userEmail,
				url,
				baseUrl: this.configService.get<string>('EMAIL_CALLBACK'),
			},
		});
	}

	async sendSignupConfirmation(userEmail: string, url: string) {
		await this.mailerService.sendMail({
			to: userEmail,
			subject: '온라인 명륜당 회원가입',
			template: './signup',
			context: {
				name: userEmail,
				url,
				baseUrl: this.configService.get<string>('EMAIL_CALLBACK'),
			},
		});
	}
}
