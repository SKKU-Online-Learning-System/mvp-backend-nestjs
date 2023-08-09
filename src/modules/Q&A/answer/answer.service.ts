import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { isAuthor } from 'src/configs/etc/functions.config';
import { HttpResponse, status } from 'src/configs/etc/http-response.config';
import { Answer } from 'src/entities/answer.entity';
import { ReqUser } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
	constructor(private dataSource: DataSource) {}

	async getAll(user: ReqUser) {
		return this.dataSource.getRepository(Answer).find({
			where: { authorId: user.id },
			relations: ['question'],
		});
	}

	async create(dto: CreateAnswerDto, user: ReqUser): Promise<HttpResponse> {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.getRepository(Answer)
			.insert({ authorId: user.id, ...dto });

		if (!affectedRows) throw new InternalServerErrorException();

		return status(201);
	}

	async update(
		answerId: number,
		dto: UpdateAnswerDto,
		user: ReqUser,
	): Promise<HttpResponse> {
		const target = await this.dataSource
			.getRepository(Answer)
			.findOneBy({ id: answerId });

		if (!isAuthor(target, user)) throw new BadRequestException();

		await this.dataSource
			.getRepository(Answer)
			.update(answerId, { ...dto });
		return status(200);
	}

	async delete(answerId: number, user: ReqUser): Promise<HttpResponse> {
		const target = await this.dataSource
			.getRepository(Answer)
			.findOneBy({ id: answerId });

		if (!isAuthor(target, user)) throw new BadRequestException();

		await this.dataSource.getRepository(Answer).delete(answerId);
		return status(200);
	}
}
