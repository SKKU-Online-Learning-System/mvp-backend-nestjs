import { Injectable } from '@nestjs/common';
import { Cat1Entity } from 'src/entities/cat1.entity';
import { Cat2Entity } from 'src/entities/cat2.entity';
import { CourseEntity } from 'src/entities/course.entity';
import { CourseHashtagEntity } from 'src/entities/course-hashtag.entity';
import { HashtagEntity } from 'src/entities/hashtag.entity';
import { LectureEntity } from 'src/entities/lecture.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserLectureEntity } from 'src/entities/user-lecture.entity';
import { DataSource } from 'typeorm';
import { Cat1_seed } from './seeds/cat1.seed';
import { Cat2_seed } from './seeds/cat2.seed';
import { Course_seed } from './seeds/course.seed';
import { Course_hashtag_seed } from './seeds/course-hashtag.seed';
import { Hashtag_seed } from './seeds/hashtag.seed';
import { Lecture_seed } from './seeds/lecture.seed';
@Injectable()
export class DataSeedService {
	constructor(private dataSource: DataSource) {}

	async home() {
		const seeds = [
			{ seed: Cat1_seed, table: Cat1Entity },
			{ seed: Cat2_seed, table: Cat2Entity },
			{ seed: Course_seed, table: CourseEntity },
			{ seed: Hashtag_seed, table: HashtagEntity },
			{ seed: Course_hashtag_seed, table: CourseHashtagEntity },
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
			cat1: await this.dataSource.getRepository(Cat1Entity).count(),
			cat2: await this.dataSource.getRepository(Cat2Entity).count(),
			course_hashtag: await this.dataSource
				.getRepository(CourseHashtagEntity)
				.count(),
			course: await this.dataSource.getRepository(CourseEntity).count(),
			hashtag: await this.dataSource.getRepository(HashtagEntity).count(),
			lecture: await this.dataSource.getRepository(LectureEntity).count(),
			user_lecture: await this.dataSource
				.getRepository(UserLectureEntity)
				.count(),
			user: await this.dataSource.getRepository(UserEntity).count(),
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
