import {
	Controller,
	Post,
	UploadedFile,
	UploadedFiles,
	UseInterceptors,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ApiTags } from '@nestjs/swagger';
  
@ApiTags('File')
@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}
  
	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.MulterS3.File) {
	  return this.fileService.uploadFile(file);
	}
  }