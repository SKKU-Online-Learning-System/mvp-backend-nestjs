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
import { Answer } from 'src/entities/answer.entity';
import { ReqUser, Role } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
	constructor(private dataSource: DataSource) {}

	async createAnswer(
		questionId: number,
		dto: CreateAnswerDto,
		user: ReqUser,
	): Promise<HttpResponse> {
		const { contents } = dto;

		const {
			raw: { affectedRows },
		} = await this.dataSource
			.getRepository(Answer)
			.insert({ questionId, authorId: user.id, contents });

		if (!affectedRows) throw new InternalServerErrorException();

		return status(201);
	}

	async updateAnswer(
		answerId: number,
		dto: UpdateAnswerDto,
		user: ReqUser,
	): Promise<HttpResponse> {
		const { contents } = dto;

		const target = await this.dataSource
			.getRepository(Answer)
			.findOneBy({ id: answerId });

		if (!target) throw new BadRequestException();

		const isAdmin = user.role === Role.ADMIN;
		const isAuthor = target && target?.authorId === user.id;

		if (!isAdmin && !isAuthor) throw new BadRequestException();

		const { affected } = await this.dataSource
			.getRepository(Answer)
			.update(answerId, { contents });

		if (!affected) throw new InternalServerErrorException();

		return status(200);
	}

	async deleteAnswer(answerId: number, user: ReqUser): Promise<HttpResponse> {
		const target = await this.dataSource
			.getRepository(Answer)
			.findOneBy({ id: answerId });

		if (!target) throw new BadRequestException();

		const isAdmin = user.role === Role.ADMIN;
		const isAuthor = target && target?.authorId === user.id;

		if (!isAdmin && !isAuthor) throw new BadRequestException();

		const { affected } = await this.dataSource
			.getRepository(Answer)
			.delete(answerId);

		if (!affected) throw new InternalServerErrorException();

		return status(200);
	}
}
