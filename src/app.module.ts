import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { TypeOrmConfigModule } from './configs/database/db.config.module';
import { TypeOrmConfigService } from './configs/database/db.config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { CourseModule } from './api/course/course.module';
import { LectureModule } from './api/lecture/lecture.module';
import { UserModule } from './api/user/user.module';
import { PageModule } from './page/page.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [TypeOrmConfigModule],
			useClass: TypeOrmConfigService,
			inject: [TypeOrmConfigService],
		}),
		AuthModule,
		CourseModule,
		LectureModule,
		UserModule,
		PageModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
