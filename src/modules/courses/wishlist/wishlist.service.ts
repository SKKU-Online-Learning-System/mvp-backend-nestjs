import {
	Injectable,
	InternalServerErrorException,
	NotImplementedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { WishlistEntity } from 'src/entities/wishlist.entity';
import { status } from 'src/configs/etc/http-response.config';

@Injectable()
export class WishlistService {
	constructor(private dataSource: DataSource) {}

	async getAllWishlists(userId: number) {
		return await this.dataSource.getRepository(WishlistEntity).find({
			where: { userId },
			relations: {
				course: {
					// instructor: true,
					category1: true,
					category2: true,
				},
			},
			select: {
				course: {
					id: true,
					title: true,
					description: true,
					summary: true,
					// instructor: {
					// 	nickname: true,
					// },
					category1: {
						name: true,
					},
					category2: {
						name: true,
					},
					thumbnail: true,
					difficulty: true,
					createdAt: true,
				},
			},
		});
	}

	async createWishlistByCourseId(userId: number, courseId: number) {
		const {
			raw: { affectedRows },
		} = await this.dataSource
			.getRepository(WishlistEntity)
			.insert({ userId, courseId });

		if (affectedRows !== 1) throw new InternalServerErrorException();

		return status(201);
	}

	async deleteWishlistByCourseId(userId: number, courseId: number) {
		const { affected } = await this.dataSource
			.getRepository(WishlistEntity)
			.delete({ userId, courseId });

		if (affected !== 1) throw new InternalServerErrorException();

		return status(200);
	}
}
