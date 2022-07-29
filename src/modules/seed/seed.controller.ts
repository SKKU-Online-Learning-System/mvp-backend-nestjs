import { Controller, Get, Render } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
	constructor(private readonly seedService: SeedService) {}

	@Get()
	@Render('seed')
	home() {
		return this.seedService.home();
	}
}
