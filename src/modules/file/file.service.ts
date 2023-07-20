import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LectureEntity } from '../../entities/lecture.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { HttpResponse, status } from 'src/configs/etc/http-response.config';
import { DataSource } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(LectureEntity)
    private readonly lectureRepository: Repository<LectureEntity>,
  ) {}

  async uploadFile(
    file: Express.MulterS3.File, 
    createVideoDto: CreateVideoDto
  ): Promise<HttpResponse> {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    // Create a new LectureEntity object and populate it with data from createVideoDto
    const lecture = new LectureEntity();
    lecture.title = createVideoDto.title;
    lecture.duration = createVideoDto.duration;
    lecture.filename = file.location;
    lecture.courseId = createVideoDto.courseId;
    lecture.sectionId = createVideoDto.sectionId;

    // Get the current date and time and set it as the createdAt value
    const currentDate = new Date();
    lecture.createdAt = currentDate;

    // Save the lecture entity to the database using the lectureRepository
    await this.lectureRepository.save(lecture);
    return status(201);
  }
}
