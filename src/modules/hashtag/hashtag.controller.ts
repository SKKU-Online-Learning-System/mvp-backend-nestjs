import { Controller, Get } from '@nestjs/common';
import { HashtagService } from './hashtag.service';

@Controller('hashtag')
export class HashtagController {
	constructor(private readonly hashtagService: HashtagService) {}

	@Get()
	getHashtags() {
		return this.hashtagService.getHashtags();
	}
}
