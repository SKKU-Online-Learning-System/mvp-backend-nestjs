import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { TypeOrmConfigModule } from './configs/database/config.module';
import { TypeOrmConfigService } from './configs/database/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSeedModule } from './routes/data-seed/data-seed.module';
import { AuthModule } from './routes/auth/auth.module';
import { CourseModule } from './routes/course/course.module';
import { LectureModule } from './routes/lecture/lecture.module';
import { UserModule } from './routes/user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [TypeOrmConfigModule],
			useClass: TypeOrmConfigService,
			inject: [TypeOrmConfigService],
		}),
		DataSeedModule,
		AuthModule,
		CourseModule,
		LectureModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
