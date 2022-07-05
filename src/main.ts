import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { swaggerConfig } from './configs/swagger/swagger.config';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	swaggerConfig(app);

	// middleware
	app.enableCors();
	app.use(helmet());

	// view engine
	app.setViewEngine('pug');
	app.setBaseViewsDir(`${__dirname}/../views`);

	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	
	// hot reload
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}

	await app.listen(3000);
}
bootstrap();
