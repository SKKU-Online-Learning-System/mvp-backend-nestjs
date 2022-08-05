import { IsNumberString, IsString } from 'class-validator';

export class CreateVideoDto {
	@IsNumberString()
	courseId: number;
	@IsNumberString()
	sectionId: number;
	@IsString()
	title: string;
	@IsNumberString()
	duration: number;
	@IsString()
	filename: string;
}
