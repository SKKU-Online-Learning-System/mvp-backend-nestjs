import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseLayoutService } from './course-layout.service';
import { CreateCourseLayoutDto } from './dto/create-course-layout.dto';
// import { UpdateCourseLayoutDto } from './dto/update-course-layout.dto';
import { CourseLayout } from 'src/entities/course-layout.entity';

@Controller('course-layout')
export class CourseLayoutController {
  constructor(private readonly courseLayoutService: CourseLayoutService) {}

  @Post()
  create(@Body() createCourseLayoutDto: CreateCourseLayoutDto[]): Promise<CourseLayout[]> {
    return this.courseLayoutService.createFromCourseIds(createCourseLayoutDto);
  }

  
  @Get(':order/:sequence')
  orderBySequence(@Param('order') order: number, @Param('sequence') sequence: number): Promise<CourseLayout[]> {
    return this.courseLayoutService.getByOrderAndSequence(order, sequence);
  }

}
