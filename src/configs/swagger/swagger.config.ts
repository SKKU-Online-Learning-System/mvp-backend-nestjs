import {
	DocumentBuilder,
	SwaggerDocumentOptions,
	SwaggerModule,
} from '@nestjs/swagger';
import { SwaggerUpdates } from './swagger.update';

export const swaggerConfig = (app) => {
	const config = new DocumentBuilder()
		.setTitle('SKKU Online Learning Platform')
		.setDescription(SwaggerUpdates)
		.setVersion('0.0.1')
		.build();

	// const options: SwaggerDocumentOptions = {
	// 	include: [],
	// };

	const document = SwaggerModule.createDocument(app, config); // options 사용시, createDocument의 3번째 인자로 options 전달
	SwaggerModule.setup('api-docs', app, document);
};
