import {
	BadRequestException,
	Injectable,
	NotImplementedException,
} from '@nestjs/common';
import { AnswerEntity } from 'src/entities/answer.entity';
import { QuestionEntity } from 'src/entities/question.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { DeleteQuestionDto } from './dto/delete-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
	constructor(private dataSource: DataSource) {}

	async getQuestionsByCourseId(id: number) {
		const questions = await this.dataSource
			.getRepository(QuestionEntity)
			.find({
				where: {
					courseId: id,
				},
				relations: {
					user: true,
					answers: {
						user: true,
					},
				},
				select: {
					id: true,
					contents: true,
					createdAt: true,
					user: {
						email: true,
					},
					answers: {
						id: true,
						contents: true,
						createdAt: true,
						user: {
							email: true,
						},
					},
				},
			});
		return questions;
	}

	async getQuestionsByLectureId(id: number) {
		return await this.dataSource.getRepository(QuestionEntity).find({
			where: {
				lectureId: id,
			},
			relations: {
				user: true,
				answers: {
					user: true,
				},
			},
			select: {
				id: true,
				contents: true,
				createdAt: true,
				user: {
					email: true,
				},
				answers: {
					id: true,
					contents: true,
					createdAt: true,
					user: {
						email: true,
					},
				},
			},
		});
	}

	async createQuestion(createQuestionDto: CreateQuestionDto) {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.createQueryBuilder()
			.insert()
			.into(QuestionEntity)
			.values(createQuestionDto)
			.execute();

		if (affectedRows) {
			return { statusCode: 201, message: 'Created' };
		} else {
			throw new NotImplementedException(
				'question.service: createQuestion - Nothing inserted.',
			);
		}
	}

	async updateQuestionById(updateQuestionDto: UpdateQuestionDto) {
		const { questionId, userId, contents } = updateQuestionDto;

		const result = await this.dataSource
			.createQueryBuilder()
			.select('question.userId')
			.from(QuestionEntity, 'question')
			.where('id = :questionId', { questionId })
			.getOne();

		if (result && result?.userId === userId) {
			const { affected } = await this.dataSource
				.createQueryBuilder()
				.update(QuestionEntity)
				.set({ contents })
				.where('id = :questionId', { questionId })
				.execute();

			if (affected) {
				return { statusCode: 200, message: 'OK' };
			} else {
				throw new NotImplementedException(
					'question.service: updateQuestionById - Nothing updated.',
				);
			}
		} else {
			throw new BadRequestException('Wrong user ID');
		}
	}

	async deleteQuestionById(deleteQuestionDto: DeleteQuestionDto) {
		const { questionId, userId } = deleteQuestionDto;

		const result = await this.dataSource
			.createQueryBuilder()
			.select('question.userId')
			.from(QuestionEntity, 'question')
			.where('id = :questionId', { questionId })
			.getOne();

		if (result && result?.userId === userId) {
			const { affected } = await this.dataSource
				.createQueryBuilder()
				.delete()
				.from(QuestionEntity)
				.where('id = :questionId', { questionId })
				.execute();

			if (affected) {
				return { statusCode: 200, message: 'OK' };
			} else {
				throw new NotImplementedException(
					'question.service: deleteQuestionById - Nothing deleted.',
				);
			}
		} else {
			throw new BadRequestException('Wrong user ID');
		}
	}
}
