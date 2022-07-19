import { Module } from '@nestjs/common';
import { SeedModule } from '../seed/seed.module';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
	imports: [SeedModule],
	controllers: [PageController],
	providers: [PageService],
})
export class PageModule {}
