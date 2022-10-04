import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { ApiBanner } from './banner.swagger';

@ApiTags('Banner')
@Controller('banners')
export class BannerController {
	constructor(private readonly bannerService: BannerService) {}

	@Get()
	@ApiBanner.getBanners()
	getActives() {
		return this.bannerService.getActives();
	}
}
