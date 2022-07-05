import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailConfigModule } from 'src/configs/mail/mail.config.module';
import { MailConfigService } from 'src/configs/mail/mail.config.service';
import { MailService } from './mail.service';

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [MailConfigModule],
			useClass: MailConfigService,
			inject: [MailConfigService],
		}),
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
