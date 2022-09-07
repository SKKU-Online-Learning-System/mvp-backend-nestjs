import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/configs/decorator/user.decorator';
import { ReqUser, Role } from 'src/entities/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AnswerService } from './answer.service';
import { ApiAnswer } from './answer.swagger';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@ApiTags('Answer')
@Controller('answers')
export class AnswerController {
	constructor(private readonly answerService: AnswerService) {}

	@Post('question/:questionId')
	@UseGuards(RolesGuard([Role.USER]))
	@ApiAnswer.createAnswer()
	createAnswer(
		@Param('questionId') questionId: number,
		@Body() dto: CreateAnswerDto,
		@User() user: ReqUser,
	) {
		return this.answerService.createAnswer(questionId, dto, user);
	}

	@Put(':answerId')
	@UseGuards(RolesGuard([Role.USER]))
	@ApiAnswer.updateAnswer()
	updateAnswer(
		@Param('answerId') answerId: number,
		@Body() dto: UpdateAnswerDto,
		@User() user: ReqUser,
	) {
		return this.answerService.updateAnswer(answerId, dto, user);
	}

	@Delete(':answerId')
	@UseGuards(RolesGuard([Role.USER]))
	@ApiAnswer.deleteAnswer()
	deleteAnswer(@Param('answerId') answerId: number, @User() user: ReqUser) {
		return this.answerService.deleteAnswer(answerId, user);
	}
}
