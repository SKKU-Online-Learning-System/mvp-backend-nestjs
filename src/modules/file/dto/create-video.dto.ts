import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateVideoDto {
	@IsString()
	title: string;
	@IsNumberString()
	courseId: number;
	@IsNumberString()
	sectionId: number;
	@IsNumberString()
	duration: number;
}
