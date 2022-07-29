import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailConfigService } from 'src/configs/mail/mail.config.service';
import { MailService } from './mail.service';

@Module({
	imports: [
		MailerModule.forRootAsync({
			useClass: MailConfigService,
		}),
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
