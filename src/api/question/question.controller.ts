import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { DeleteQuestionDto } from './dto/delete-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
	constructor(private readonly questionService: QuestionService) {}

	@Get('course/:courseId')
	getAllQuestionByCourseId(@Param('courseId') id: number) {
		return this.questionService.getAllQuestionByCourseId(id);
	}

	@Get('lecture/:lectureId')
	getQuestionByLectureId(@Param('lectureId') id: number) {
		return this.questionService.getQuestionByLectureId(id);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	createQuestion(@BPU() createQuestionDto: CreateQuestionDto) {
		return this.questionService.createQuestion(createQuestionDto);
	}

	@UseGuards(JwtAuthGuard)
	@Put(':questionId')
	updateQuestionById(@BPU() updateQuestionDto: UpdateQuestionDto) {
		return this.questionService.updateQuestionById(updateQuestionDto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':questionId')
	deleteQuestionById(@BPU() deleteQuestionDto: DeleteQuestionDto) {
		return this.questionService.deleteQuestionById(deleteQuestionDto);
	}
}
