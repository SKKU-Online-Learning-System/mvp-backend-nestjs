import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { NoticeService } from './notice.service';
import { Notice } from '../../entities/notice.entity';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@ApiTags('Notice')
@Controller('notices')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notices' })
  findAll(): Promise<Notice[]> {
    return this.noticeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a notice by id' })
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id') id: number): Promise<Notice> {
    return this.noticeService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new notice' })
  @ApiBody({ type: CreateNoticeDto })
  async create(@Body() createNoticeDto: CreateNoticeDto): Promise<Notice> {
    return this.noticeService.create(createNoticeDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a notice by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateNoticeDto })
  update(@Param('id') id: number, @Body() updateNoticeDto: UpdateNoticeDto): Promise<Notice> {
    return this.noticeService.update(id, updateNoticeDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notice by id' })
  @ApiParam({ name: 'id', required: true })
  remove(@Param('id') id: number): Promise<void> {
    return this.noticeService.remove(id);
  }
}

// 공지사항을 저장할 테이블
// id: 공지사항의 고유한 식별자
// title: 공지사항의 제목
// content: 공지사항의 내용
// createdAt: 공지사항이 작성된 날짜와 시간
// updatedAt: 공지사항이 마지막으로 수정된 날짜와 시간

// API:
// GET /notices: 모든 공지사항을 가져오는 API. 이 API는 공지사항을 생성된 날짜의 내림차순으로 정렬해서 반환
// GET /notices/:id: 특정 공지사항을 가져오는 API. 이 API는 id 매개변수를 사용해 해당하는 공지사항을 반환
// POST /notices: 새로운 공지사항을 생성하는 API. 이 API는 HTTP 요청 본문에 있는 데이터를 사용해 새로운 공지사항을 데이터베이스에 추가
// PUT /notices/:id: 특정 공지사항을 수정하는 API. 이 API는 id 매개변수를 사용해 해당하는 공지사항을 찾고, HTTP 요청 본문에 있는 데이터로 공지사항을 업데이트
// DELETE /notices/:id: 특정 공지사항을 삭제하는 API. 이 API는 id 매개변수를 사용해 해당하는 공지사항을 찾고 삭제