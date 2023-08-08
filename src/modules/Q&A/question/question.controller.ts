import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/configs/decorator/user.decorator';
import { ReqUser, Role } from 'src/entities/user.entity';
import { RolesGuard } from '../../../configs/guards/roles.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';
import { ApiQuestion } from './question.swagger';

@ApiTags('Question')
@Controller('questions')
export class QuestionController {
	constructor(private readonly questionService: QuestionService) {}

	@Get('course/:courseId')
	@ApiQuestion.getManyByCourseId
	getManyByCourseId(@Param('courseId') courseId: number) {
		return this.questionService.getManyByCourseId(courseId);
	}

	@Get(':questionId')
	@ApiQuestion.getOne
	getOne(@Param('questionId') questionId: number) {
		return this.questionService.getOne(questionId);
	}

	@Get()
	@UseGuards(RolesGuard([Role.USER]))
	@ApiQuestion.getAll
	getAll(@User() user: ReqUser) {
		return this.questionService.getAll(user);
	}

	@Post()
	@UseGuards(RolesGuard([Role.USER]))
	@ApiQuestion.create
	create(@Body() dto: CreateQuestionDto, @User() user: ReqUser) {
		return this.questionService.create(dto, user);
	}

	@Put(':questionId')
	@UseGuards(RolesGuard([Role.USER]))
	@ApiQuestion.update
	update(
		@Param('questionId') questionId: number,
		@Body() dto: UpdateQuestionDto,
		@User() user: ReqUser,
	) {
		return this.questionService.update(questionId, dto, user);
	}

	@Delete(':questionId')
	@UseGuards(RolesGuard([Role.USER]))
	@ApiQuestion.delete
	delete(@Param('questionId') questionId: number, @User() user: ReqUser) {
		return this.questionService.delete(questionId, user);
	}
}
