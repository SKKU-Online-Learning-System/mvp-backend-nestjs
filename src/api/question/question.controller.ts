import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
	constructor(private readonly questionService: QuestionService) {}

	@Get('course/:courseId')
	getAllQuestionByCourseId() {
		return this.questionService.getAllQuestionByCourseId();
	}

	@Get('lecture/:lectureId')
	getQuestionByLectureId() {
		return this.questionService.getQuestionByLectureId();
	}

	@Post()
	createQuestion() {
		return this.createQuestion();
	}

	@Put(':questionId')
	updateQuestionById() {
		return this.updateQuestionById();
	}

	@Delete(':questionId')
	deleteQuestionById() {
		return this.deleteQuestionById();
	}
}
