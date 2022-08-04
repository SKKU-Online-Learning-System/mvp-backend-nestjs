import { Controller, Get, Render } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
	constructor(private readonly seedService: SeedService) {}

	@Get()
	@Render('seed')
	seed() {
		return this.seedService.seed();
	}

	@Get('admin')
	admin() {
		return this.seedService.admin();
	}

	@Get('answer')
	answer() {
		return this.seedService.answer();
	}

	@Get('category1')
	category1() {
		return this.seedService.category1();
	}

	@Get('category2')
	category2() {
		return this.seedService.category2();
	}

	@Get('course')
	course() {
		return this.seedService.course();
	}

	@Get('course-hashtag')
	course_hashtag() {
		return this.seedService.course_hashtag();
	}

	@Get('enrollment')
	enrollment() {
		return this.seedService.enrollment();
	}

	@Get('hashtag')
	hashtag() {
		return this.seedService.hashtag();
	}

	@Get('history')
	history() {
		return this.seedService.history();
	}

	@Get('lecture')
	lecture() {
		return this.seedService.lecture();
	}

	@Get('question')
	question() {
		return this.seedService.question();
	}

	@Get('section')
	section() {
		return this.seedService.section();
	}

	@Get('teaching-assistent')
	teaching_assistent() {
		return this.seedService.teaching_assistent;
	}

	@Get('user')
	user() {
		return this.seedService.user();
	}

	@Get('wishlist')
	wishlist() {
		return this.seedService.wishlist();
	}
}
