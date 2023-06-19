import {
	Controller,
	Post,
	Body,
	Param,
	Delete,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/configs/decorator/user.decorator';
import { ReqUser, Role } from 'src/entities/user.entity';
import { RolesGuard } from 'src/configs/guards/roles.guard';
import { CommentService } from './comment.service';
import { ApiComment } from './comment.swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comment')
@Controller('comments')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Post()
	@UseGuards(RolesGuard([Role.USER]))
	@ApiComment.create
	create(@Body() dto: CreateCommentDto, @User() user: ReqUser) {
		return this.commentService.create(dto, user);
	}

	@Put(':commentId')
	@UseGuards(RolesGuard([Role.USER]))
	@ApiComment.update
	update(
		@Param('commentId') commentId: number,
		@Body() dto: UpdateCommentDto,
		@User() user: ReqUser,
	) {
		return this.commentService.update(commentId, dto, user);
	}

	@Delete(':commentId')
	@UseGuards(RolesGuard([Role.USER]))
	@ApiComment.delete
	delete(@Param('commentId') commentId: number, @User() user: ReqUser) {
		return this.commentService.delete(commentId, user);
	}
}
