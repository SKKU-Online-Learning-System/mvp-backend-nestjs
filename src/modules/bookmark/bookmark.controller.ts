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

	@Get('learning')
	@UseGuards(JwtAuthGuard)
	@ApiBookmark.getAllLearningBookmarks()
	getAllLearningBookmarks(@User() user) {
		return this.bookmarkService.getAllLearningBookmarks(user);
	}

	@Post('learning/:courseId')
	@UseGuards(JwtAuthGuard)
	@ApiBookmark.addLearningBookmark()
	addLearningBookmarkByCourseId(@User() user, @Param('courseId') id: number) {
		return this.bookmarkService.addLearningBookmarkByCourseId(user, id);
	}

	@Delete('learning/:courseId')
	@UseGuards(JwtAuthGuard)
	@ApiBookmark.deleteLearningBookmark()
	deleteLearningBookmarkByCourseId(
		@User() user,
		@Param('courseId') id: number,
	) {
		return this.bookmarkService.deleteLearningBookmarkByCourseId(user, id);
	}

	@Get('complete')
	@UseGuards(JwtAuthGuard)
	@ApiBookmark.getAllCompleteBookmarks()
	getAllCompleteBookmarks(@User() user) {
		return this.bookmarkService.getAllCompleteBookmarks(user);
	}

	@Post('complete/:courseId')
	@UseGuards(JwtAuthGuard)
	@ApiBookmark.addCompleteBookmark()
	addCompleteBookmarkByCourseId(@User() user, @Param('courseId') id: number) {
		return this.bookmarkService.addCompleteBookmarkByCourseId(user, id);
	}

	@Delete('complete/:courseId')
	@UseGuards(JwtAuthGuard)
	@ApiBookmark.deleteCompleteBookmark()
	deleteCompleteBookmarkByCourseId(
		@User() user,
		@Param('courseId') id: number,
	) {
		return this.bookmarkService.deleteCompleteBookmarkByCourseId(user, id);
	}
}
