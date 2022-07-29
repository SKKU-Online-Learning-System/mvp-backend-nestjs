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
		// .addTag('Admin', '')
		.addTag('Auth', '')
		.addTag('Course', '')
		.addTag('Learning', '수강 중인 Course')
		.addTag('Complete', '수강 완료한 Course')
		.addTag('History', 'Lecture 시청 기록')
		.addTag('Lecture', '')
		.addTag('Bookmark', 'Course 즐겨찾기 기능')
		.addTag('Wishlist', 'Course 찜하기 기능')
		.addTag('Banner', '메인 페이지의 배너')
		.addTag('Question', '')
		.addTag('Answer', '')
		.addTag('Hashtag', '해시태그 추가/삭제는 관리자 전용')
		// .addTag('User', '')
		// .addTag('Seed', '백엔드 전용입니다(사용X)')
		.build();

	// const options: SwaggerDocumentOptions = {
	// 	include: [],
	// };

	const document = SwaggerModule.createDocument(app, config); // options 사용시, createDocument의 3번째 인자로 options 전달
	SwaggerModule.setup('api-docs', app, document);
};
