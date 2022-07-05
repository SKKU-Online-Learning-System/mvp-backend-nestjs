import { Module } from '@nestjs/common';
import { MailConfigService } from './mail.config.service';

@Module({
	providers: [MailConfigService],
})
export class MailConfigModule {}
