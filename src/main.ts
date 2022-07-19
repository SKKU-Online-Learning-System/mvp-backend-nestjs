import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { swaggerConfig } from './configs/swagger/swagger.config';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	swaggerConfig(app);

	// middleware
	app.enableCors();
	app.use(helmet());
	app.use(cookieParser());

	// view engine
	app.setViewEngine('pug');
	app.setBaseViewsDir(`${__dirname}/../views`);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
			validateCustomDecorators: true,
		}),
	);

	await app.listen(3000);
}
bootstrap();
