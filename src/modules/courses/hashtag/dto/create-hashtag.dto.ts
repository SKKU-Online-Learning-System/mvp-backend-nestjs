import { IsString } from 'class-validator';

export class CreateHashtagDto {
	@IsString()
	readonly tag: string;
}
