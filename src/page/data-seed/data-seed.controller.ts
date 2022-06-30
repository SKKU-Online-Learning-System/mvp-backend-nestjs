import { Controller, Get, Render } from '@nestjs/common';
import { DataSeedService } from './data-seed.service';

@Controller('page/data-seed')
export class DataSeedController {
	constructor(private readonly dataSeedService: DataSeedService) {}

	@Get()
	@Render('data-seed')
	home() {
		return this.dataSeedService.home();
	}
}
