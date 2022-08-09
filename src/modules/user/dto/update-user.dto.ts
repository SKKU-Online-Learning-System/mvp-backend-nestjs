import { IsInt, IsString } from 'class-validator';

export class UpdateUserDto {
	@IsString()
	readonly nickname: string;

	@IsInt()
	readonly privilege: number;
}
