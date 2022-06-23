import { Controller, Get, Render } from '@nestjs/common';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
	constructor(private pageService: PageService) {}

	@Get()
	@Render('home')
	homePage() {
		return this.pageService.homePage();
	}

	@Get('login')
	@Render('login')
	loginPage() {
		return this.pageService.loginPage();
	}
}
