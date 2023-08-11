import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { isAuthor } from 'src/configs/etc/functions.config';
import { HttpResponse, status } from 'src/configs/etc/http-response.config';
import { Question } from 'src/entities/question.entity';
import { ReqUser, UserEntity } from 'src/entities/user.entity';
import { DataSource, getRepository } from 'typeorm';
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

	async getAll(user: ReqUser) {
		return this.dataSource.getRepository(Question).find({
			where: { authorId: user.id },
			relations: ['course'],
		});
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

	async likeQuestion(questionId: number, user: ReqUser): Promise<HttpResponse> {
		const questionRepository = this.dataSource.getRepository(Question);
  		const question = await questionRepository
    		.createQueryBuilder('question')
    		.leftJoinAndSelect('question.likesByUsers', 'likesByUsers')
    		.where('question.id = :id', { id: questionId })
    		.getOne();
	  
		if (!question) {
		  throw new BadRequestException('Question not found');
		}
	  
		if (question.authorId === user.id) {
		  throw new BadRequestException('You cannot like your own question');
		}
	  
		const userEntity = new UserEntity();
		userEntity.id = user.id;
	  
		if (question.likesByUsers.some(likedUser => likedUser.id === user.id)) {
		  throw new BadRequestException('You have already liked this question');
		}
		question.likes += 1;
		question.likesByUsers.push(userEntity);
		await this.dataSource.getRepository(Question).save(question);
	  
		return status(200);
	  }
	
	//   async isUserLikedQuestion(userId: number, questionId: number): Promise<boolean> {
	// 	const questionRepository = this.dataSource.getRepository(Question);
	// 	const question = await questionRepository
	// 	  .createQueryBuilder('question')
	// 	  .leftJoin('question.likesByUsers', 'likesByUsers')
	// 	  .where('question.id = :id', { id: questionId })
	// 	  .andWhere('likesByUsers.id = :userId', { userId })
	// 	  .getOne();
		
	// 	if (!question) {
	// 	  throw new BadRequestException('Question not found');
	// 	}
	  
	// 	return !!question.likesByUsers; // question.likesByUsers가 있는 경우에만 true 반환
	//   }

}
