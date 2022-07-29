import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { TypeOrmConfigService } from './configs/database/db.config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { LectureModule } from './modules/lecture/lecture.module';
import { UserModule } from './modules/user/user.module';
import { HistoryModule } from './modules/history/history.module';
import { AdminModule } from './modules/admin/admin.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/answer.module';
import { LearningModule } from './modules/learning/learning.module';
import { CompleteModule } from './modules/complete/complete.module';
import { BannerModule } from './modules/banner/banner.module';
import { HashtagModule } from './modules/hashtag/hashtag.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfigService,
		}),
		AdminModule,
		AuthModule,
		CourseModule,
		HistoryModule,
		LectureModule,
		UserModule,
		WishlistModule,
		BookmarkModule,
		QuestionModule,
		AnswerModule,
		HistoryModule,
		LearningModule,
		CompleteModule,
		BannerModule,
		HashtagModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
