import { Injectable } from '@nestjs/common';
import { Category1Entity } from 'src/entities/category1.entity';
import { Category2Entity } from 'src/entities/category2.entity';
import { CourseEntity } from 'src/entities/course.entity';
import { CourseHashtagEntity } from 'src/entities/course-hashtag.entity';
import { HashtagEntity } from 'src/entities/hashtag.entity';
import { LectureEntity } from 'src/entities/lecture.entity';
import { UserEntity } from 'src/entities/user.entity';
import { AdminEntity } from 'src/entities/admin.entity';
import { WishlistEntity } from 'src/entities/wishlist.entity';
import { LearningEntity } from 'src/entities/learning.entity';
import { DataSource } from 'typeorm';
import { Category1 } from './seeds/category1.seed';
import { Category2 } from './seeds/category2.seed';
import { Course } from './seeds/course.seed';
import { CourseHashtag } from './seeds/course-hashtag.seed';
import { Hashtag } from './seeds/hashtag.seed';
import { Lecture } from './seeds/lecture.seed';
import { User } from './seeds/user.seed';
import { Admin } from './seeds/admin.seed';
import { Complete } from './seeds/complete.seed';
import { CompleteEntity } from 'src/entities/complete.entity';
import { HistoryEntity } from 'src/entities/history.entity';
import { History } from './seeds/history.seed';
import { Wishlist } from './seeds/wishlist.seed';
import { Learning } from './seeds/learning.seed';
import { Section } from './seeds/section.seed';
import { SectionEntity } from 'src/entities/section.entity';

@Injectable()
export class SeedService {
	constructor(private dataSource: DataSource) {}

	async home() {
		const seeds = [
			{ seed: Admin, table: AdminEntity },
			{ seed: Category1, table: Category1Entity },
			{ seed: Category2, table: Category2Entity },
			{ seed: Course, table: CourseEntity },
			{ seed: CourseHashtag, table: CourseHashtagEntity },
			{ seed: Hashtag, table: HashtagEntity },
			{ seed: Lecture, table: LectureEntity },
			{ seed: User, table: UserEntity },
			{ seed: Complete, table: CompleteEntity },
			{ seed: History, table: HistoryEntity },
			{ seed: Wishlist, table: WishlistEntity },
			{ seed: Learning, table: LearningEntity },
			{ seed: Section, table: SectionEntity}
		];

		if (true) {
			await seeds.map(({ seed, table }) =>
				seed.map((data) =>
					this.dataSource.manager.save(
						this.dataSource.getRepository(table).create(data),
					),
				),
			);
		}

		return {
			title: 'Data Seeded!',
			description: 'Dummy data has inserted.',
			dataCount: await this.countData(),
		};
	}

	async countData() {
		return {
			admin: await this.dataSource.getRepository(AdminEntity).count(),
			category1: await this.dataSource
				.getRepository(Category1Entity)
				.count(),
			category2: await this.dataSource
				.getRepository(Category2Entity)
				.count(),
			course_hashtag: await this.dataSource
				.getRepository(CourseHashtagEntity)
				.count(),
			complete: await this.dataSource
				.getRepository(CompleteEntity)
				.count(),
			history: await this.dataSource.getRepository(HistoryEntity).count(),
			course: await this.dataSource.getRepository(CourseEntity).count(),
			hashtag: await this.dataSource.getRepository(HashtagEntity).count(),
			lecture: await this.dataSource.getRepository(LectureEntity).count(),
			user: await this.dataSource.getRepository(UserEntity).count(),
			wishlist: await this.dataSource
				.getRepository(WishlistEntity)
				.count(),
			learning: await this.dataSource
				.getRepository(LearningEntity)
				.count(),
			section: await this.dataSource
				.getRepository(SectionEntity)
				.count(),
		};
	}

	// Query Runner Example
	// async dataSeed() {
	// 	const queryRunner = this.dataSource.createQueryRunner();

	// 	await queryRunner.connect();
	// 	await queryRunner.startTransaction();

	// 	try {
	// 		await queryRunner.manager.save([]);
	// 		await queryRunner.commitTransaction();
	// 	} catch (e) {
	// 		await queryRunner.rollbackTransaction();
	// 	} finally {
	// 		await queryRunner.release();
	// 	}
	// }
}
