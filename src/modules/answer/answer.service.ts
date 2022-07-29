import {
	BadRequestException,
	Injectable,
	NotImplementedException,
} from '@nestjs/common';
import { AnswerEntity } from 'src/entities/answer.entity';
import { DataSource } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { DeleteAnswerDto } from './dto/delete-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
	constructor(private dataSource: DataSource) {}

	async createAnswer(createAnswerDto: CreateAnswerDto) {
		const { questionId, userId, contents } = createAnswerDto;

		const {
			raw: { affectedRows },
		} = await this.dataSource
			.createQueryBuilder()
			.insert()
			.into(AnswerEntity)
			.values({ questionId, authorId: userId, contents })
			.execute();

		if (affectedRows) {
			return { statusCode: 201, message: 'OK' };
		} else {
			throw new NotImplementedException(
				'answer.service: createAnswer - Nothing inserted.',
			);
		}
	}

	async updateAnswerById(updateAnswerDto: UpdateAnswerDto) {
		const { answerId, userId, contents } = updateAnswerDto;

		const result = await this.dataSource
			.createQueryBuilder()
			.select('answer.userId')
			.from(AnswerEntity, 'answer')
			.where('id = :answerId', { answerId })
			.getOne();

		if (result && result?.authorId === userId) {
			const { affected } = await this.dataSource
				.createQueryBuilder()
				.update(AnswerEntity)
				.set({ contents })
				.where('id = :answerId', { answerId })
				.execute();

			if (affected) {
				return { statusCode: 200, message: 'OK' };
			} else {
				throw new NotImplementedException(
					'answer.service: updateAnswerById - Nothing updated.',
				);
			}
		} else {
			throw new BadRequestException('Wrong user ID');
		}
	}

	async deleteAnswerById(deleteAnswerDto: DeleteAnswerDto) {
		const { answerId, userId } = deleteAnswerDto;

		const result = await this.dataSource
			.createQueryBuilder()
			.select('answer.userId')
			.from(AnswerEntity, 'answer')
			.where('id = :answerId', { answerId })
			.getOne();

		if (result && result?.authorId === userId) {
			const { affected } = await this.dataSource
				.createQueryBuilder()
				.delete()
				.from(AnswerEntity)
				.where('id = :answerId', { answerId })
				.execute();

			if (affected) {
				return { statusCode: 200, message: 'OK' };
			} else {
				throw new NotImplementedException(
					'answer.service: deleteAnswerById - Nothing deleted.',
				);
			}
		} else {
			throw new BadRequestException('Wrong user ID');
		}
	}
}
