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
import { DataSource } from 'typeorm';
import { Category1 } from './seeds/category1.seed';
import { Category2 } from './seeds/category2.seed';
import { Course } from './seeds/course.seed';
import { CourseHashtag } from './seeds/course-hashtag.seed';
import { Hashtag } from './seeds/hashtag.seed';
import { Lecture } from './seeds/lecture.seed';
import { User } from './seeds/user.seed';
import { Admin } from './seeds/admin.seed';
import { HistoryEntity } from 'src/entities/history.entity';
import { History } from './seeds/history.seed';
import { Wishlist } from './seeds/wishlist.seed';
import { Section } from './seeds/section.seed';
import { SectionEntity } from 'src/entities/section.entity';
import { Question } from './seeds/question.seed';
import { QuestionEntity } from 'src/entities/question.entity';
import { Answer } from './seeds/answer.seed';
import { AnswerEntity } from 'src/entities/answer.entity';
import { EnrollmentEntity } from 'src/entities/enrollment.entity';
import { TeachingAssistentEntity } from 'src/entities/teaching-assistent.entity';

@Injectable()
export class SeedService {
	constructor(private dataSource: DataSource) {}

	async seed() {
		const seeds = [
			{ seed: Admin, table: AdminEntity },
			{ seed: User, table: UserEntity },
			{ seed: Category1, table: Category1Entity },
			{ seed: Category2, table: Category2Entity },
			{ seed: Course, table: CourseEntity },
			{ seed: Hashtag, table: HashtagEntity },
			{ seed: CourseHashtag, table: CourseHashtagEntity },
			{ seed: Section, table: SectionEntity },
			{ seed: Lecture, table: LectureEntity },
			{ seed: History, table: HistoryEntity },
			{ seed: Wishlist, table: WishlistEntity },
			{ seed: Question, table: QuestionEntity },
			{ seed: Answer, table: AnswerEntity },
		];

		const dataCount = {};

		if (true) {
			await seeds.map(({ seed, table }) => {
				seed.map((data) => {
					this.dataSource.manager.save(
						this.dataSource.getRepository(table).create(data),
					);
				});
			});
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
			user: await this.dataSource.getRepository(UserEntity).count(),
			category1: await this.dataSource
				.getRepository(Category1Entity)
				.count(),
			category2: await this.dataSource
				.getRepository(Category2Entity)
				.count(),
			course: await this.dataSource.getRepository(CourseEntity).count(),
			hashtag: await this.dataSource.getRepository(HashtagEntity).count(),
			course_hashtag: await this.dataSource
				.getRepository(CourseHashtagEntity)
				.count(),
			section: await this.dataSource.getRepository(SectionEntity).count(),
			lecture: await this.dataSource.getRepository(LectureEntity).count(),
			history: await this.dataSource.getRepository(HistoryEntity).count(),
			wishlist: await this.dataSource
				.getRepository(WishlistEntity)
				.count(),
			question: await this.dataSource
				.getRepository(QuestionEntity)
				.count(),
			answer: await this.dataSource.getRepository(AnswerEntity).count(),
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

	async admin() {
		return await this.dataSource.getRepository(AdminEntity).find();
	}

	async answer() {
		return await this.dataSource.getRepository(AnswerEntity).find();
	}

	async category1() {
		return await this.dataSource.getRepository(Category1Entity).find();
	}

	async category2() {
		return await this.dataSource.getRepository(Category2Entity).find();
	}

	async course() {
		return await this.dataSource.getRepository(CourseEntity).find();
	}

	async course_hashtag() {
		return await this.dataSource.getRepository(CourseHashtagEntity).find();
	}

	async enrollment() {
		return await this.dataSource.getRepository(EnrollmentEntity).find();
	}

	async hashtag() {
		return await this.dataSource.getRepository(HashtagEntity).find();
	}

	async history() {
		return await this.dataSource.getRepository(HistoryEntity).find();
	}

	async lecture() {
		return await this.dataSource.getRepository(LectureEntity).find();
	}

	async question() {
		return await this.dataSource.getRepository(QuestionEntity).find();
	}

	async section() {
		return await this.dataSource.getRepository(SectionEntity).find();
	}

	async teaching_assistent() {
		return await this.dataSource
			.getRepository(TeachingAssistentEntity)
			.find();
	}

	async user() {
		return await this.dataSource.getRepository(UserEntity).find();
	}

	async wishlist() {
		return await this.dataSource.getRepository(WishlistEntity).find();
	}
}
