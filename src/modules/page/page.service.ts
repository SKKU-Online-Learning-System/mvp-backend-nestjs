import { Injectable } from '@nestjs/common';

@Injectable()
export class PageService {
	homePage() {
		return {
			title: '/page',
			description: '백엔드 팀원끼리 테스트하기 위해 만들었습니다.',
		};
	}

	loginPage() {
		return {
			title: '/page/login',
			description: '로그인 테스트',
		};
	}
}
