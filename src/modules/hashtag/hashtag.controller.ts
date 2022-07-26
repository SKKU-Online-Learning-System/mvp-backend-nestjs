import { Controller, Get } from '@nestjs/common';
import { HashtagService } from './hashtag.service';

@Controller('hashtags')
export class HashtagController {
	constructor(private readonly hashtagService: HashtagService) {}

	@Get()
	getHashtags() {
		return this.hashtagService.getHashtags();
	}
}
