import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { TypeOrmConfigService } from './configs/database/db.config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { LectureModule } from './modules/lecture/lecture.module';
import { UserModule } from './modules/user/user.module';
import { HistoryModule } from './modules/history/history.module';
import { AdminModule } from './modules/admin/admin.module';
import { BannerModule } from './modules/banner/banner.module';
import { SeedModule } from './modules/seed/seed.module';
import { FileModule } from './modules/file/file.module';
import { RouterModule } from '@nestjs/core';
import { routes } from './router';
import { QnAModule } from './modules/Q&A/qna.module';
import { CoursesModule } from './modules/courses/courses.module';
import { PopularCoursesModule } from './modules/popular-courses/popular-courses.module';
import { MainLayoutModule } from './modules/main-layout/main-layout.module';
import { NoticeModule } from './modules/notice/notice.module';


@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfigService,
		}),
		RouterModule.register(routes),
		AdminModule,
		AuthModule,
		CoursesModule,
		HistoryModule,
		LectureModule,
		UserModule,
		HistoryModule,
		QnAModule,
		BannerModule,
		SeedModule,
		FileModule,
		PopularCoursesModule,
		MainLayoutModule,
		NoticeModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
