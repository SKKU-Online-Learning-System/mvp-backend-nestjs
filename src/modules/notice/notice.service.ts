import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from '../../entities/notice.entity';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,
  ) {}

  findAll(): Promise<Notice[]> {
    return this.noticeRepository.find();
  }

  findOne(id: number): Promise<Notice> {
    return this.noticeRepository.findOne({ where: { id: id }});
  }

  async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    const notice = new Notice();
    notice.title = createNoticeDto.title;
    notice.content = createNoticeDto.content;
  
    return this.noticeRepository.save(notice);
  }

  async update(id: number, updateNoticeDto: UpdateNoticeDto): Promise<Notice> {
    let notice = await this.noticeRepository.findOne({ where: { id: id }});
  
    if (updateNoticeDto.title) {
      notice.title = updateNoticeDto.title;
    }
  
    if (updateNoticeDto.content) {
      notice.content = updateNoticeDto.content;
    }
  
    return this.noticeRepository.save(notice);
  }

  async remove(id: number): Promise<void> {
    await this.noticeRepository.delete(id);
  }
}
