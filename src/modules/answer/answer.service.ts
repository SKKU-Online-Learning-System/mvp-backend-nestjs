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
import { AnswerEntity } from 'src/entities/answer.entity';
import { DataSource } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { DeleteAnswerDto } from './dto/delete-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
	constructor(private dataSource: DataSource) {}

	async createAnswer(
		createAnswerDto: CreateAnswerDto,
	): Promise<HttpResponse> {
		const { questionId, userId, contents } = createAnswerDto;

		const {
			raw: { affectedRows },
		} = await this.dataSource
			.getRepository(AnswerEntity)
			.insert({ questionId, authorId: userId, contents });

		if (!affectedRows) throw new InternalServerErrorException();

		return status(201);
	}

	async updateAnswerById(
		updateAnswerDto: UpdateAnswerDto,
	): Promise<HttpResponse> {
		const { answerId, userId, contents } = updateAnswerDto;

		const result = await this.dataSource
			.getRepository(AnswerEntity)
			.findOne({ where: { id: answerId } });

		if (!(result && result?.authorId === userId))
			throw new BadRequestException();

		const { affected } = await this.dataSource
			.getRepository(AnswerEntity)
			.update({ id: answerId }, { contents });

		if (!affected) throw new InternalServerErrorException();

		return status(200);
	}

	async deleteAnswerById(
		deleteAnswerDto: DeleteAnswerDto,
	): Promise<HttpResponse> {
		const { answerId, userId } = deleteAnswerDto;

		const result = await this.dataSource
			.getRepository(AnswerEntity)
			.findOne({ where: { id: answerId } });

		if (!(result && result?.authorId === userId))
			throw new BadRequestException();

		const { affected } = await this.dataSource
			.getRepository(AnswerEntity)
			.delete(answerId);

		if (!affected) throw new InternalServerErrorException();

		return status(200);
	}
}
