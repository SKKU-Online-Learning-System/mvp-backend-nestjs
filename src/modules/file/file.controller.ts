import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Query,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ApiTags, ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
import multerS3 = require('multer-s3')
import path = require('path');
import { CreateVideoDto } from './dto/create-video.dto';
  
@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file'),
  )
  async uploadFile(
    @UploadedFile() file: Express.MulterS3.File,
    @Query() createVideoDTO: CreateVideoDto,
    ) {
      console.log('Uploaded File:', file);
      console.log('CreateVideoDTO:', createVideoDTO);
      return this.fileService.uploadFile(file, createVideoDTO);
  }
}