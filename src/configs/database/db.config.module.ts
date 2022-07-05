import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './db.config.service';

@Module({
	providers: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
