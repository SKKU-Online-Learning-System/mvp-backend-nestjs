import { Injectable } from '@nestjs/common';

export type TempUser = any;
@Injectable()
export class UserService {
	private readonly users = [
		{
			userId: 1,
			username: 'john',
			password: 'johnpw',
		},
		{
			userId: 2,
			username: 'maria',
			password: 'mariapw',
		},
	];

	async findOne(username: string): Promise<TempUser | undefined> {
		return this.users.find((user) => user.username === username);
	}
}
