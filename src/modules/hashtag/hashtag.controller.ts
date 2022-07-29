import { Controller, Delete, Get, Post } from '@nestjs/common';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { DeleteHashtagDto } from './dto/delete-hashtag.dto';
import { GetHashtagDto } from './dto/get-hashtag.dto';
import { HashtagService } from './hashtag.service';

@Controller('hashtags')
export class HashtagController {
	constructor(private readonly hashtagService: HashtagService) {}

	@Get()
	getHashtags() {
		return this.hashtagService.getHashtags();
	}

	@Get(':hashtagId')
	getHashtagById(@BPU() getHashtagDto: GetHashtagDto) {
		return this.hashtagService.getHashtagById(getHashtagDto);
	}

	@Post()
	createHashtag(@BPU() createHashtagDto: CreateHashtagDto) {
		return this.hashtagService.createHashtag(createHashtagDto);
	}

	@Delete(':hashtagId')
	deleteHashtagById(@BPU() deleteHashtagDto: DeleteHashtagDto) {
		return this.hashtagService.deleteHashtagById(deleteHashtagDto);
	}
}
