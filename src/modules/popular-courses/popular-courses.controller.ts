import { Controller, Get, Query, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PopularCoursesService } from './popular-courses.service';
import { CreatePopularCourseDto } from './dto/create-popular-course.dto';
import { UpdatePopularCourseDto } from './dto/update-popular-course.dto';
import { ApiOperation, ApiResponse,ApiTags, ApiQuery } from '@nestjs/swagger';
import { PopularCourseEntity } from '../../entities/popular-course.entity'

@ApiTags('PopularCourses')
@Controller('popular-courses')
export class PopularCoursesController {
  constructor(private readonly popularCoursesService: PopularCoursesService) {}

  // @Post()
  // create(@Body() createPopularCourseDto: CreatePopularCourseDto) {
  //   return this.popularCoursesService.create(createPopularCourseDto);
  // }

  // @Get()
  // findAll() {
  //   return this.popularCoursesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.popularCoursesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePopularCourseDto: UpdatePopularCourseDto) {
  //   return this.popularCoursesService.update(+id, updatePopularCourseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.popularCoursesService.remove(+id);
  // }

  @Post('update')
  @ApiOperation({ summary: 'Update popular courses' })
  async updatePopularCourses() {
    await this.popularCoursesService.updatePopularCourses();
    return { message: 'Popular courses updated successfully.' };
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
