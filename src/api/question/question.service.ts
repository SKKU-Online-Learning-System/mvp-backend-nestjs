import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class QuestionService {
	constructor(private dataSource: DataSource) {}

	async createQuestion() {
		return;
	}

	async getAllQuestionByCourseId() {
		return;
	}

	async getQuestionByLectureId() {
		return;
	}

	async updateQuestionById() {
		return;
	}

	async deleteQuestionById() {
		return;
	}
}
