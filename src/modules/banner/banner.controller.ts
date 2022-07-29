import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { ApiBanner } from './banner.swagger';

@ApiTags('Banner')
@Controller('banner')
export class BannerController {
	constructor(private readonly bannerService: BannerService) {}

	@Get()
	@ApiBanner.getBanners()
	getBanners() {
		return this.bannerService.uploadFiles();
	}
}
