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
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { DeleteAnswerDto } from './dto/delete-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
export class AnswerController {
	constructor(private readonly answerService: AnswerService) {}

	@Get('question/:questionId')
	getAnswersByQuestionId(@Param('questionId') id: number) {
		return this.answerService.getAnswersByQuestionId(id);
	}

	@UseGuards(JwtAuthGuard)
	@Post('question/:questionId')
	createAnswer(@BPU() createAnswerDto: CreateAnswerDto) {
		return this.answerService.createAnswer(createAnswerDto);
	}

	@UseGuards(JwtAuthGuard)
	@Put(':answerId')
	updateAnswer(@BPU() updateAnswerDto: UpdateAnswerDto) {
		return this.answerService.updateAnswerById(updateAnswerDto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':answerId')
	deleteAnswer(@BPU() deleteAnswerDto: DeleteAnswerDto) {
		return this.answerService.deleteAnswerById(deleteAnswerDto);
	}
}
