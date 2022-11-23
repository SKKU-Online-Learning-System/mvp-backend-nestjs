import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private configService: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'mysql',
			host: this.configService.get<string>('DB_HOST'),
			port: this.configService.get<number>('DB_PORT'),
			username: this.configService.get<string>('DB_USERNAME'),
			password: this.configService.get<string>('DB_PASSWORD'),
			database: this.configService.get<string>('DB_DATABASE'),
			entities: [
				`${__dirname}/../../**/*.entity.{js,ts}`,
				// for hot reload
				// 'dist/**/*.entity.{js,ts}',
			],
			synchronize: true,
			autoLoadEntities: true,
			logging: true,
		};
	}
}
