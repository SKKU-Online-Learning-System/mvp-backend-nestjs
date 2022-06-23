import { Module } from '@nestjs/common';
import { DataSeedModule } from './data-seed/data-seed.module';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
	imports: [DataSeedModule],
	controllers: [PageController],
	providers: [PageService],
})
export class PageModule {}
