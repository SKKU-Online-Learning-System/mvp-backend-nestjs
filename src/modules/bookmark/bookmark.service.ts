import { Injectable, NotImplementedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LearningEntity } from 'src/entities/learning.entity';
import { CompleteEntity } from 'src/entities/complete.entity';
import { Complete } from '../seed/seeds/complete.seed';
@Injectable()
export class BookmarkService {
	constructor(private dataSource: DataSource) {}

	async getAllLearningBookmarks(user) {
		const lists = await this.dataSource
			.createQueryBuilder()
			.from(LearningEntity, 'learning')
			.select('learning')
			.where('userId = :id AND bookmark = true', { id: user.id })
			.getMany();
		return lists;
	}

	async addLearningBookmarkByCourseId(user, id: number) {
		const { affected } = await this.dataSource
			.createQueryBuilder()
			.from(LearningEntity, 'learning')
			.where('userId = :uID AND courseId = :cID', {
				uID: user.id,
				cID: id,
			})
			.update({
				bookmark: true,
			})
			.execute();
		if (affected) {
			return { statusCode: 201, message: 'Bookmarked' };
		} else {
			throw new NotImplementedException(
				'bookmark.service: addBookmarkById - Nothing changed.',
			);
		}
	}

	async deleteLearningBookmarkByCourseId(user, id: number) {
		const { affected } = await this.dataSource
			.createQueryBuilder()
			.from(LearningEntity, 'learning')
			.where('userId = :uID AND courseId = :cID', {
				uID: user.id,
				cID: id,
			})
			.update({
				bookmark: false,
			})
			.execute();
		if (affected) {
			return { statusCode: 201, message: 'Unbookmarked' };
		} else {
			throw new NotImplementedException(
				'bookmark.service: deleteBookmarkById - Nothing changed.',
			);
		}
	}

	async getAllCompleteBookmarks(user) {
		const lists = await this.dataSource
			.createQueryBuilder()
			.from(CompleteEntity, 'complete')
			.select('complete')
			.where('userId = :id AND bookmark = true', { id: user.id })
			.getMany();
		return lists;
	}

	async addCompleteBookmarkByCourseId(user, id: number) {
		const { affected } = await this.dataSource
			.createQueryBuilder()
			.from(CompleteEntity, 'complete')
			.where('userId = :uID AND courseId = :cID', {
				uID: user.id,
				cID: id,
			})
			.update({
				bookmark: true,
			})
			.execute();
		if (affected) {
			return { statusCode: 201, message: 'Bookmarked' };
		} else {
			throw new NotImplementedException(
				'bookmark.service: addCompleteBookmarkById - Nothing changed.',
			);
		}
	}

	async deleteCompleteBookmarkByCourseId(user, id: number) {
		const { affected } = await this.dataSource
			.createQueryBuilder()
			.from(CompleteEntity, 'complete')
			.where('userId = :uID AND courseId = :cID', {
				uID: user.id,
				cID: id,
			})
			.update({
				bookmark: false,
			})
			.execute();
		if (affected) {
			return { statusCode: 201, message: 'Unbookmarked' };
		} else {
			throw new NotImplementedException(
				'bookmark.service: deleteCompleteBookmarkById - Nothing changed.',
			);
		}
	}
}
