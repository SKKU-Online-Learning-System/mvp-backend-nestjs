import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { isAuthor } from 'src/configs/etc/functions.config';
import { HttpResponse, status } from 'src/configs/etc/http-response.config';
import { Question } from 'src/entities/question.entity';
import { ReqUser } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
	constructor(private dataSource: DataSource) {}

	async getManyByCourseId(courseId: number) {
		const questions: any = await this.dataSource
			.getRepository(Question)
			.find({
				where: { courseId },
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
			// delete question.answers;
		});
		return questions;
	}

	async getOne(questionId: number) {
		const question = await this.dataSource.getRepository(Question).findOne({
			where: { id: questionId },
			relations: {
				author: true,
				answers: {
					author: true,
					comments: {
						author: true,
					},
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
					comments: {
						id: true,
						author: {
							id: true,
							nickname: true,
						},
						contents: true,
						createdAt: true,
					},
				},
			},
		});
		if (!question) throw new BadRequestException();
		return question;
	}

	async create(dto: CreateQuestionDto, user: ReqUser): Promise<HttpResponse> {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.getRepository(Question)
			.insert({ authorId: user.id, ...dto });

		if (!affectedRows) throw new InternalServerErrorException();

		return status(201);
	}

	async update(
		questionId: number,
		dto: UpdateQuestionDto,
		user: ReqUser,
	): Promise<HttpResponse> {
		const target = await this.dataSource
			.getRepository(Question)
			.findOneBy({ id: questionId });

		if (!isAuthor(target, user)) throw new BadRequestException();

		await this.dataSource
			.getRepository(Question)
			.update(questionId, { ...dto });
		return status(200);
	}

	async delete(questionId: number, user: ReqUser): Promise<HttpResponse> {
		const target = await this.dataSource
			.getRepository(Question)
			.findOneBy({ id: questionId });

		if (!isAuthor(target, user)) throw new BadRequestException();

		await this.dataSource.getRepository(Question).delete(questionId);
		return status(200);
	}
}
