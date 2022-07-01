import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailConfigModule } from 'src/configs/email/email.config.module';
import { EmailConfigService } from 'src/configs/email/email.config.service';
import { MailService } from './mail.service';

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [EmailConfigModule],
			useClass: EmailConfigService,
			inject: [EmailConfigService],
		}),
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
