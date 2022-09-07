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
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';
import { ApiQuestion } from './question.swagger';

@ApiTags('Question')
@Controller('questions')
export class QuestionController {
	constructor(private readonly questionService: QuestionService) {}

	@Get('course/:courseId')
	@ApiQuestion.getQuestionsByCourseId()
	getQuestionsByCourseId(@Param('courseId') courseId: number) {
		return this.questionService.getQuestionsByCourseId(courseId);
	}

	// @Get('lecture/:lectureId')
	// @ApiQuestion.getQuestionsByLectureId()
	// getQuestionsByLectureId(@Param('lectureId') lectureId: number) {
	// 	return this.questionService.getQuestionsByLectureId(lectureId);
	// }

	@Get(':questionId')
	@ApiQuestion.getQuestion()
	getQuestion(@Param('questionId') questionId: number) {
		return this.questionService.getQuestion(questionId);
	}

	@Post()
	@UseGuards(RolesGuard([Role.USER]))
	@ApiQuestion.createQuestion()
	createQuestion(@Body() dto: CreateQuestionDto, @User() user: ReqUser) {
		return this.questionService.createQuestion(dto, user);
	}

	@Put(':questionId')
	@UseGuards(RolesGuard([Role.USER]))
	@ApiQuestion.updateQuestion()
	updateQuestion(
		@Param('questionId') questionId: number,
		@Body() dto: UpdateQuestionDto,
		@User() user: ReqUser,
	) {
		return this.questionService.updateQuestion(questionId, dto, user);
	}

	@Delete(':questionId')
	@UseGuards(RolesGuard([Role.USER]))
	@ApiQuestion.deleteQuestion()
	deleteQuestion(
		@Param('questionId') questionId: number,
		@User() user: ReqUser,
	) {
		return this.questionService.deleteQuestion(questionId, user);
	}
}
