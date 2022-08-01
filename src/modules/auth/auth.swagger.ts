import { applyDecorators } from '@nestjs/common';
import {
	ApiBody,
	ApiConflictResponse,
	ApiCookieAuth,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiQuery,
} from '@nestjs/swagger';

export const ApiAuth = {
	emailCheck() {
		return applyDecorators(
			ApiOperation({
				summary: '이메일 중복 확인',
				description: '',
			}),
			ApiParam({
				name: 'email',
				type: 'string',
			}),
			ApiOkResponse({
				description: 'OK',
			}),
			ApiConflictResponse({
				description: 'Conflict',
			}),
		);
	},
	nicknameCheck() {
		return applyDecorators(
			ApiOperation({
				summary: '닉네임 중복 확인',
				description: '',
			}),
			ApiParam({
				name: 'nickname',
				type: 'string',
			}),
			ApiOkResponse({
				description: 'OK',
			}),
			ApiConflictResponse({
				description: 'Conflict',
			}),
		);
	},
	signup() {
		return applyDecorators(
			ApiOperation({
				summary: '일반 유저 회원가입',
				description:
					'이메일로 회원가입 인증 링크를 발송합니다. 회원가입 시 사용자가 입력한 이메일과 닉네임을 각각 "destination"과 "nickname"에 담아 보내면 사용자에게 이메일이 발송됩니다.',
			}),
			ApiBody({
				schema: {
					properties: {
						destination: { type: 'string' },
						nickname: { type: 'string' },
					},
				},
			}),
		);
	},
	signupCallback() {
		return applyDecorators(
			ApiOperation({
				summary: '회원가입 링크 검증',
				description:
					'사용자는 이메일로 토큰을 받습니다. 로그인 된 상태를 확인하는 토큰과는 별개로 회원가입 인증만을 위한 토큰입니다. 받은 이메일의 링크를 클릭하면 프론트엔드에서는 토큰을 이 API의 쿼리 스트링으로 보내주셔야 합니다. 그럼 회원가입과 로그인이 동시에 이루어집니다.',
			}),
			ApiQuery({ name: 'token', type: 'string' }),
			ApiOkResponse({
				headers: {
					setCookie: {
						description: '쿠키로 토큰 전달',
						schema: {
							properties: {
								Authorization: { type: 'string' },
							},
						},
					},
				},
			}),
		);
	},
	login() {
		return applyDecorators(
			ApiOperation({
				summary: '일반 유저 로그인',
				description:
					'이메일로 로그인 링크를 발송합니다. 사용자가 입력한 이메일을 body의 "destination"에 담아 보내면 사용자에게 이메일이 발송됩니다.',
			}),
			ApiBody({
				schema: {
					properties: {
						destination: { type: 'string' },
					},
				},
			}),
		);
	},
	loginCallback() {
		return applyDecorators(
			ApiOperation({
				summary: '로그인 링크 검증',
				description:
					' 사용자는 이메일로 토큰을 받습니다 로그인 된 상태를 확인하는 토큰과는 별개로 이메일 인증만을 위한 토큰입니다. 받은 이메일의 링크를 클릭하면 프론트엔드에서는 토큰을 이 API의 쿼리 스트링으로 보내주셔야 합니다.',
			}),
			ApiQuery({ name: 'token', type: 'string' }),
			ApiOkResponse({
				headers: {
					setCookie: {
						description: '쿠키로 토큰 전달.',
						schema: {
							properties: {
								Authorization: { type: 'string' },
							},
						},
					},
				},
			}),
		);
	},
	createAdmin() {
		return applyDecorators(
			ApiOperation({
				summary: '관리자 계정 생성 - 사용 안함',
				description: 'ID와 PW로 관리자 계정을 생성합니다.',
			}),
			ApiBody({
				schema: {
					properties: {
						username: { type: 'string' },
						password: { type: 'string' },
					},
				},
			}),
		);
	},
	adminLogin() {
		return applyDecorators(
			ApiOperation({
				summary: '관리자 로그인 - 사용 안함',
				description: 'body로 username과 password를 body로 보냅니다.',
			}),
			ApiBody({
				schema: {
					properties: {
						username: { type: 'string' },
						password: { type: 'string' },
					},
				},
			}),
		);
	},
	logout() {
		return applyDecorators(
			ApiOperation({
				summary: '로그아웃',
				description: '사용자의 "Authorization" 쿠키를 삭제합니다.',
			}),
		);
	},
	getProfile() {
		return applyDecorators(
			ApiOperation({
				summary: '프로필 - 테스트용',
				description:
					'로그인 상태인 경우 사용자 정보를 돌려줍니다. 로그인 상태가 아닌 경우 "no user"를 돌려줍니다.',
			}),
			ApiCookieAuth(),
		);
	},
	getToken() {
		return applyDecorators(
			ApiOperation({
				summary: 'JWT 토큰 생성 - 테스트용',
				description:
					'로그인 했을 때 얻을 수 있는 JWT 토큰을 돌려줍니다.',
			}),
		);
	},
	tempLogin() {
		return applyDecorators(
			ApiOperation({
				summary: '테스트 로그인 - 테스트용',
				description:
					'로그인 과정 없이 로그인합니다. 쿠키에 JWT 토큰이 저장됩니다.',
			}),
		);
	},
};
