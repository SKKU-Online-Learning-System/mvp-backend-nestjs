import {
	BadRequestException,
	Injectable,
	NotImplementedException,
} from '@nestjs/common';
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
		return await this.dataSource
			.createQueryBuilder()
			.select(['courseId', 'lectureId', 'contents', 'createdAt'])
			.addSelect('question.id', 'questionId')
			.from(QuestionEntity, 'question')
			.leftJoin(UserEntity, 'user', 'user.id = question.userId')
			.addSelect('email', 'author')
			.where('courseId = :id', { id })
			.getRawMany();
	}

	async getQuestionsByLectureId(id: number) {
		return await this.dataSource
			.createQueryBuilder()
			.select(['courseId', 'lectureId', 'contents', 'createdAt'])
			.addSelect('question.id', 'questionId')
			.from(QuestionEntity, 'question')
			.leftJoin(UserEntity, 'user', 'user.id = question.userId')
			.addSelect('email', 'author')
			.where('lectureId = :id', { id })
			.getRawMany();
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

		const [result] = await this.dataSource
			.createQueryBuilder()
			.select('question.userId')
			.from(QuestionEntity, 'question')
			.where('id = :questionId', { questionId })
			.execute();

		if (result && result?.question_userId === userId) {
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

		const [result] = await this.dataSource
			.createQueryBuilder()
			.select('question.userId')
			.from(QuestionEntity, 'question')
			.where('id = :questionId', { questionId })
			.execute();

		if (result && result?.question_userId === userId) {
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
