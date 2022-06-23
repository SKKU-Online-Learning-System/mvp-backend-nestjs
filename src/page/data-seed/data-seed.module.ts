import { Module } from '@nestjs/common';
import { DataSeedController } from './data-seed.controller';
import { DataSeedService } from './data-seed.service';

@Module({
  controllers: [DataSeedController],
  providers: [DataSeedService]
})
export class DataSeedModule {}
