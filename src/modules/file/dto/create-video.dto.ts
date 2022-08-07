import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateVideoDto {
	@IsNumberString()
	courseId: number;
	@IsNumberString()
	sectionId: number;
	@IsString()
	title: string;
	@IsNumberString()
	duration: number;
	@IsNotEmpty()
	video: Express.Multer.File;
}
