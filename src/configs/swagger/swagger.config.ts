import {
	DocumentBuilder,
	SwaggerDocumentOptions,
	SwaggerModule,
} from '@nestjs/swagger';
import { AuthModule } from 'src/api/auth/auth.module';
import { CourseModule } from 'src/api/course/course.module';
import { LectureModule } from 'src/api/lecture/lecture.module';
import { UserModule } from 'src/api/user/user.module';
import { SwaggerUpdates } from './swagger.update';

export const swaggerConfig = (app) => {
	const config = new DocumentBuilder()
		.setTitle('SKKU Online Learning Platform')
		.setDescription(SwaggerUpdates)
		.setVersion('0.0.1')
		.build();

	const options: SwaggerDocumentOptions = {
		include: [AuthModule, CourseModule, LectureModule, UserModule],
	};

	const document = SwaggerModule.createDocument(app, config, options);
	SwaggerModule.setup('api-docs', app, document);
};
