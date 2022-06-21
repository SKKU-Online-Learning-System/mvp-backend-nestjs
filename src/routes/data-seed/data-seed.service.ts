import { Injectable } from '@nestjs/common';
import { Cat1 } from 'src/entities/cat1.entity';
import { Cat2 } from 'src/entities/cat2.entity';
import { Course } from 'src/entities/course.entity';
import { Course_hashtag } from 'src/entities/course_hashtag.entity';
import { Hashtag } from 'src/entities/hashtag.entity';
import { Lecture } from 'src/entities/lecture.entity';
import { User } from 'src/entities/user.entity';
import { User_lecture } from 'src/entities/user_lecture.entity';
import { DataSource } from 'typeorm';
import { Cat1_seed } from './seeds/cat1.seed';
import { Cat2_seed } from './seeds/cat2.seed';
import { Course_seed } from './seeds/course.seed';
import { Course_hashtag_seed } from './seeds/course_hashtag.seed';
import { Hashtag_seed } from './seeds/hashtag.seed';

@Injectable()
export class DataSeedService {
	constructor(private dataSource: DataSource) {}

	async home() {
		const seeds = [
			{ seed: Cat1_seed, table: Cat1 },
			{ seed: Cat2_seed, table: Cat2 },
			{ seed: Course_seed, table: Course },
			{ seed: Hashtag_seed, table: Hashtag },
			{ seed: Course_hashtag_seed, table: Course_hashtag },
		];

		if (true) {
			seeds.map(({ seed, table }) =>
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
			cat1: await this.dataSource.getRepository(Cat1).count(),
			cat2: await this.dataSource.getRepository(Cat2).count(),
			course_hashtag: await this.dataSource
				.getRepository(Course_hashtag)
				.count(),
			course: await this.dataSource.getRepository(Course).count(),
			hashtag: await this.dataSource.getRepository(Hashtag).count(),
			lecture: await this.dataSource.getRepository(Lecture).count(),
			user_lecture: await this.dataSource
				.getRepository(User_lecture)
				.count(),
			user: await this.dataSource.getRepository(User).count(),
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
