import { Controller, Get, Query, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PopularCoursesService } from './popular-courses.service';
import { CreatePopularCourseDto } from './dto/create-popular-course.dto';
import { UpdatePopularCourseDto } from './dto/update-popular-course.dto';
import { ApiOperation, ApiResponse,ApiTags, ApiQuery } from '@nestjs/swagger';
import { PopularCourseEntity } from '../../entities/popular-course.entity'

@ApiTags('PopularCourses')
@Controller('popular-courses')
export class PopularCoursesController {
  constructor(private readonly popularCoursesService: PopularCoursesService) {}

  @Post('update')
  @ApiOperation({ summary: 'Update popular courses' })
  async updatePopularCourses() {
    await this.popularCoursesService.updatePopularCourses();
    return { message: 'Popular courses updated successfully.' };
  }
  
  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get a popular course by course id' })
  @ApiResponse({ status: 200, description: 'The popular course has been successfully fetched.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async getPopularCourseByCourseId(
    @Param('courseId') courseId: number
  ): Promise<PopularCourseEntity> {
    const popularCourse = await this.popularCoursesService.getPopularCourseByCourseId(courseId);
  
    if (!popularCourse) {
      throw new NotFoundException('No popular course found with the provided course id.');
    }
  
    return popularCourse;
  }

  @Get()
  @ApiOperation({ summary: 'Get popular courses' })
  @ApiQuery({ name: 'limit', required: true })
  @ApiQuery({ name: 'category1', required: false }) 
  @ApiResponse({ status: 200, description: 'The popular courses have been successfully fetched.' })
  async getPopularCourses(
    @Query('limit') limit: number,
    @Query('category1') category1: string,
  ): Promise<PopularCourseEntity[]> {
    return this.popularCoursesService.getPopularCourses(limit, category1);
  }

}
