import { IsEmail, IsInt, IsString } from 'class-validator';

export class KingoCoinRequestDto {
	@IsString()
	st_id: string;

	@IsInt()
	transactionId: number;

	@IsInt()
	point: number;

	@IsString()
	description: string;

	@IsString()
	platform: string;
}
