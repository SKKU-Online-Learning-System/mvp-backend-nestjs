import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { DeleteQuestionDto } from './dto/delete-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';
import { ApiQuestion } from './question.swagger';

@ApiTags('Question')
@Controller('questions')
export class QuestionController {
	constructor(private readonly questionService: QuestionService) {}

	@Get('course/:courseId')
	@ApiQuestion.getQuestionsByCourseId()
	getQuestionsByCourseId(@Param('courseId') id: number) {
		return this.questionService.getQuestionsByCourseId(id);
	}

	@Get('lecture/:lectureId')
	@ApiQuestion.getQuestionsByLectureId()
	getQuestionsByLectureId(@Param('lectureId') id: number) {
		return this.questionService.getQuestionsByLectureId(id);
	}

	@Get(':questionId')
	@ApiQuestion.getQuestionById()
	getQuestionById(@Param('questionId') id: number) {
		return this.questionService.getQuestionById(id);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiQuestion.createQuestion()
	createQuestion(@BPU() createQuestionDto: CreateQuestionDto) {
		return this.questionService.createQuestion(createQuestionDto);
	}

	@Put(':questionId')
	@UseGuards(JwtAuthGuard)
	@ApiQuestion.updateQuestionById()
	updateQuestionById(@BPU() updateQuestionDto: UpdateQuestionDto) {
		return this.questionService.updateQuestionById(updateQuestionDto);
	}

	@Delete(':questionId')
	@UseGuards(JwtAuthGuard)
	@ApiQuestion.deleteQuestionById()
	deleteQuestionById(@BPU() deleteQuestionDto: DeleteQuestionDto) {
		return this.questionService.deleteQuestionById(deleteQuestionDto);
	}
}
