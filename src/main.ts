import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	// middleware
	app.enableCors();
	app.use(helmet());

	// view engine
	app.setViewEngine('pug');
	app.setBaseViewsDir(`${__dirname}/../views`);

	await app.listen(3000);
}
bootstrap();
