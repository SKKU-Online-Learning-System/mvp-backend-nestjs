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
		.setVersion('0.0.3')
		.addTag('Admin', '관리자 및 운영자 전용 테이블')
		.addTag('Answer', '질문 답변')
		.addTag('Auth', '')
		.addTag('Banner', '메인 페이지의 배너')
		.addTag('Bookmark', 'Course 즐겨찾기 기능')
		.addTag('Complete', '수강 완료한 Course')
		.addTag('Comment', '답변의 댓글 기능')
		.addTag('Course', '')
		.addTag('Enrollment', 'Course 수강')
		.addTag('File', '')
		.addTag('Hashtag', '해시태그 추가/삭제는 관리자 전용')
		.addTag('History', 'Lecture 시청 기록')
		.addTag('Lecture', '')
		.addTag('MainLayout', '메인페이지 관리용 테이블')
		.addTag('Notice', '공지사항 테이블')
		.addTag('PopularCourses', '통계용 테이블')
		.addTag('Question', '질문 답변')
		.addTag('User', '관리자 페이지용')
		.addTag('Wishlist', 'Course 찜하기 기능')
		// .addTag('Seed', '백엔드 전용입니다(사용X)')
		.build();

	// const options: SwaggerDocumentOptions = {
	// 	include: [],
	// };

	const document = SwaggerModule.createDocument(app, config); // options 사용시, createDocument의 3번째 인자로 options 전달
	SwaggerModule.setup('api-docs', app, document);
};
