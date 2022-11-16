import { IsEmail, IsInt, IsString } from 'class-validator';

export class KingoCoinRequestDto {
	@IsEmail()
	email: string;

	@IsInt()
	transactionId: number;

	@IsInt()
	point: number;

	@IsString()
	description: string;

	@IsString()
	platform: string;
}
