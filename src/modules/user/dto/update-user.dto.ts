import { IsInt, IsString } from 'class-validator';

export class UpdateUserDto {
	@IsString()
	readonly st_id: string;

	@IsInt()
	readonly privilege: number;
}
