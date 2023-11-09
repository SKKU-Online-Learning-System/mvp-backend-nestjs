import { IsString } from 'class-validator';

export class CreateUserDto {
	//@IsString()
	// readonly email: string;

	// @IsString()
	// readonly nickname: string;
	
	@IsString()
	readonly user_id: string;

	@IsString()
	readonly st_id: string;

	@IsString()
	readonly st_name: string;

	@IsString()
	readonly st_degree: string;

	@IsString()
	readonly st_status: string;

	@IsString()
	readonly st_dept: string;

}
