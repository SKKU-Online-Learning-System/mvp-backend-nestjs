import { Module } from '@nestjs/common';
import { EmailConfigService } from './email.config.service';

@Module({
	providers: [EmailConfigService],
})
export class EmailConfigModule {}
