import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HashtagService } from './hashtag.service';
import { ApiHashtag } from './hashtag.swagger';

@ApiTags('Hashtag')
@Controller('hashtags')
export class HashtagController {
	constructor(private readonly hashtagService: HashtagService) {}

	@Get()
	@ApiHashtag.getHashtags()
	getHashtags() {
		return this.hashtagService.getHashtags();
	}
}
