import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './config.service';

@Module({
	providers: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
