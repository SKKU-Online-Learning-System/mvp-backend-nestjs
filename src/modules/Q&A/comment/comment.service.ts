import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { isAuthor } from 'src/configs/etc/functions.config';
import { HttpResponse, status } from 'src/configs/etc/http-response.config';
import { Comment } from 'src/entities/comment.entity';
import { ReqUser } from 'src/entities/user.entity';
import { DataSource, Db } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
	constructor(private dataSource: DataSource) {}

	async create(dto: CreateCommentDto, user: ReqUser): Promise<HttpResponse> {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.getRepository(Comment)
			.insert({ authorId: user.id, ...dto });

		if (!affectedRows) throw new InternalServerErrorException();

		return status(201);
	}

	async update(
		commentId: number,
		dto: UpdateCommentDto,
		user: ReqUser,
	): Promise<HttpResponse> {
		const target = await this.dataSource
			.getRepository(Comment)
			.findOneBy({ id: commentId });

		if (!isAuthor(target, user)) throw new BadRequestException();

		await this.dataSource
			.getRepository(Comment)
			.update(commentId, { ...dto });
		return status(200);
	}

	async delete(commentId: number, user: ReqUser): Promise<HttpResponse> {
		const target = await this.dataSource
			.getRepository(Comment)
			.findOneBy({ id: commentId });

		if (!isAuthor(target, user)) throw new BadRequestException();

		await this.dataSource.getRepository(Comment).delete(commentId);
		return status(200);
	}
}
