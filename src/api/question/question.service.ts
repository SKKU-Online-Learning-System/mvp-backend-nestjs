import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { DeleteQuestionDto } from './dto/delete-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
	constructor(private dataSource: DataSource) {}

	async getAllQuestionByCourseId(id: number) {
		console.log(id);
		return;
	}

	async getQuestionByLectureId(id: number) {
		console.log(id);
		return;
	}

	async createQuestion(createQuestionDto: CreateQuestionDto) {
		console.log(createQuestionDto);
		return;
	}

	async updateQuestionById(updateQuestionDto: UpdateQuestionDto) {
		console.log(updateQuestionDto);
		return;
	}

	async deleteQuestionById(deleteQuestionDto: DeleteQuestionDto) {
		console.log(deleteQuestionDto);
		return;
	}
}
