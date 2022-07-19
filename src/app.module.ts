import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { TypeOrmConfigModule } from './configs/database/db.config.module';
import { TypeOrmConfigService } from './configs/database/db.config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { LectureModule } from './modules/lecture/lecture.module';
import { UserModule } from './modules/user/user.module';
import { PageModule } from './modules/page/page.module';
import { HistoryModule } from './modules/history/history.module';
import { AdminModule } from './modules/admin/admin.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/answer.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [TypeOrmConfigModule],
			useClass: TypeOrmConfigService,
			inject: [TypeOrmConfigService],
		}),
		AdminModule,
		AuthModule,
		CourseModule,
		HistoryModule,
		LectureModule,
		UserModule,
		WishlistModule,
		QuestionModule,
		AnswerModule,
		PageModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
