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
import { QuestionEntity } from 'src/entities/question.entity';
import { DataSource } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { DeleteQuestionDto } from './dto/delete-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
	constructor(private dataSource: DataSource) {}

	async getQuestionsByCourseId(id: number) {
		return await this.dataSource.getRepository(QuestionEntity).find({
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
	}

	async getQuestionsByLectureId(id: number) {
		return await this.dataSource.getRepository(QuestionEntity).find({
			where: {
				lectureId: id,
			},
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
	}

	async getQuestionById(id: number) {
		return await this.dataSource.getRepository(QuestionEntity).findOne({
			where: { id },
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
	}

	async createQuestion(
		createQuestionDto: CreateQuestionDto,
	): Promise<HttpResponse> {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.getRepository(QuestionEntity)
			.insert(createQuestionDto);

		if (!affectedRows) throw new NotImplementedException();

		return { statusCode: 201, message: 'Created' };
	}

	async updateQuestionById(
		updateQuestionDto: UpdateQuestionDto,
	): Promise<HttpResponse> {
		const { questionId, userId, contents } = updateQuestionDto;

		const result = await this.dataSource
			.getRepository(QuestionEntity)
			.findOneBy({ id: questionId });

		if (!(result && result?.authorId === userId))
			throw new BadRequestException();

		const { affected } = await this.dataSource
			.getRepository(QuestionEntity)
			.update(questionId, { contents });

		if (!affected) throw new InternalServerErrorException();

		return status(200);
	}

	async deleteQuestionById(
		deleteQuestionDto: DeleteQuestionDto,
	): Promise<HttpResponse> {
		const { questionId, userId } = deleteQuestionDto;

		const result = await this.dataSource
			.getRepository(QuestionEntity)
			.findOneBy({ id: questionId });

		if (!(result && result?.authorId === userId))
			throw new BadRequestException();

		const { affected } = await this.dataSource
			.getRepository(QuestionEntity)
			.delete(questionId);

		if (!affected) throw new InternalServerErrorException();

		return status(200);
	}
}
