import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotImplementedException,
} from '@nestjs/common';
import {
	HttpResponse,
	status,
} from 'src/configs/http-response/http-response.config';
import { Question } from 'src/entities/question.entity';
import { ReqUser, Role } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
	constructor(private dataSource: DataSource) {}

	async getQuestionsByCourseId(id: number) {
		const questions: any = await this.dataSource
			.getRepository(Question)
			.find({
				where: {
					courseId: id,
				},
				relations: {
					author: true,
					answers: {
						author: true,
					},
				},
				select: {
					id: true,
					title: true,
					contents: true,
					createdAt: true,
					author: {
						id: true,
						nickname: true,
					},
					answers: true,
				},
			});
		questions.map((question) => {
			question.answerCount = question.answers.length;
			delete question.answers;
		});
		return questions;
	}

	// async getQuestionsByLectureId(id: number) {
	// 	return await this.dataSource.getRepository(QuestionEntity).find({
	// 		where: {
	// 			lectureId: id,
	// 		},
	// 		relations: {
	// 			author: true,
	// 			answers: {
	// 				author: true,
	// 			},
	// 		},
	// 		select: {
	// 			id: true,
	// 			contents: true,
	// 			createdAt: true,
	// 			author: {
	// 				id: true,
	// 				nickname: true,
	// 			},
	// 			answers: {
	// 				id: true,
	// 				contents: true,
	// 				createdAt: true,
	// 				author: {
	// 					id: true,
	// 					nickname: true,
	// 				},
	// 			},
	// 		},
	// 	});
	// }

	async getQuestion(questionId: number) {
		const question = await this.dataSource.getRepository(Question).findOne({
			where: { id: questionId },
			relations: {
				author: true,
				answers: {
					author: true,
				},
			},
			select: {
				id: true,
				contents: true,
				createdAt: true,
				author: {
					id: true,
					nickname: true,
				},
				answers: {
					id: true,
					contents: true,
					createdAt: true,
					author: {
						id: true,
						nickname: true,
					},
				},
			},
		});
		if (!question) throw new BadRequestException();
		return question;
	}

	async createQuestion(
		dto: CreateQuestionDto,
		user: ReqUser,
	): Promise<HttpResponse> {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.getRepository(Question)
			.insert({ ...dto, authorId: user.id });

		if (!affectedRows) throw new InternalServerErrorException();

		return status(201);
	}

	async updateQuestion(
		questionId: number,
		dto: UpdateQuestionDto,
		user: ReqUser,
	): Promise<HttpResponse> {
		const { title, contents } = dto;

		const target = await this.dataSource
			.getRepository(Question)
			.findOneBy({ id: questionId });

		if (!target) throw new BadRequestException();

		const isAdmin = user.role === Role.ADMIN;
		const isAuthor = target && target?.authorId === user.id;

		if (!isAdmin && !isAuthor) throw new BadRequestException();

		const { affected } = await this.dataSource
			.getRepository(Question)
			.update(questionId, { title, contents });

		if (!affected) throw new InternalServerErrorException();

		return status(200);
	}

	async deleteQuestion(
		questionId: number,
		user: ReqUser,
	): Promise<HttpResponse> {
		const target = await this.dataSource
			.getRepository(Question)
			.findOneBy({ id: questionId });

		if (!target) throw new BadRequestException();

		const isAdmin = user.role === Role.ADMIN;
		const isAuthor = target && target?.authorId === user.id;

		if (!isAdmin && !isAuthor) throw new BadRequestException();

		const { affected } = await this.dataSource
			.getRepository(Question)
			.delete(questionId);

		if (!affected) throw new InternalServerErrorException();

		return status(200);
	}
}
