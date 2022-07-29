import { Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BPU } from 'src/configs/decorator/body-param-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnswerService } from './answer.service';
import { ApiAnswer } from './answer.swagger';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { DeleteAnswerDto } from './dto/delete-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@ApiTags('Answer')
@Controller('answers')
export class AnswerController {
	constructor(private readonly answerService: AnswerService) {}

	@Post('question/:questionId')
	@UseGuards(JwtAuthGuard)
	@ApiAnswer.createAnswer()
	createAnswer(@BPU() createAnswerDto: CreateAnswerDto) {
		return this.answerService.createAnswer(createAnswerDto);
	}

	@Put(':answerId')
	@UseGuards(JwtAuthGuard)
	@ApiAnswer.updateAnswer()
	updateAnswer(@BPU() updateAnswerDto: UpdateAnswerDto) {
		return this.answerService.updateAnswerById(updateAnswerDto);
	}

	@Delete(':answerId')
	@UseGuards(JwtAuthGuard)
	@ApiAnswer.deleteAnswer()
	deleteAnswer(@BPU() deleteAnswerDto: DeleteAnswerDto) {
		return this.answerService.deleteAnswerById(deleteAnswerDto);
	}
}
