import {
	Controller,
	Get,
	Post,
	Delete,
	UseGuards,
	Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/configs/decorator/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BookmarkService } from './bookmark.service';
import { ApiBookmark } from './bookmark.swagger';

@ApiTags('Bookmark')
@Controller('bookmark')
export class BookmarkController {
	constructor(private bookmarkService: BookmarkService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	getAllBookmarks(@User() user) {
		return this.bookmarkService.getAllBookmarks(user.id);
	}

	@Get('learning')
	@UseGuards(JwtAuthGuard)
	@ApiBookmark.getAllLearningBookmarks()
	getAllLearningBookmarks(@User() user) {
		return this.bookmarkService.getAllLearningBookmarks(user.id);
	}

	@Get('completed')
	@UseGuards(JwtAuthGuard)
	@ApiBookmark.getAllCompleteBookmarks()
	getAllCompletedBookmarks(@User() user) {
		return this.bookmarkService.getAllCompletedBookmarks(user.id);
	}

	@Post('course/:courseId')
	@UseGuards(JwtAuthGuard)
	@ApiBookmark.addLearningBookmark()
	createBookmarkByCourseId(
		@User() user,
		@Param('courseId') courseId: number,
	) {
		return this.bookmarkService.createBookmarkByCourseId(user.id, courseId);
	}

	@Delete('course/:courseId')
	@UseGuards(JwtAuthGuard)
	@ApiBookmark.deleteLearningBookmark()
	deleteBookmarkByCourseId(
		@User() user,
		@Param('courseId') courseId: number,
	) {
		return this.bookmarkService.deleteBookmarkByCourseId(user.id, courseId);
	}
}
