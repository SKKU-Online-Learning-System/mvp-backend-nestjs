import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PopularCoursesService } from './popular-courses.service';
import { CreatePopularCourseDto } from './dto/create-popular-course.dto';
import { UpdatePopularCourseDto } from './dto/update-popular-course.dto';
import { ApiOperation, ApiResponse,ApiTags } from '@nestjs/swagger';

@ApiTags('PopularCourses')
@Controller('popular-courses')
export class PopularCoursesController {
  constructor(private readonly popularCoursesService: PopularCoursesService) {}

  @Post()
  create(@Body() createPopularCourseDto: CreatePopularCourseDto) {
    return this.popularCoursesService.create(createPopularCourseDto);
  }

  @Get()
  findAll() {
    return this.popularCoursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.popularCoursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePopularCourseDto: UpdatePopularCourseDto) {
    return this.popularCoursesService.update(+id, updatePopularCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.popularCoursesService.remove(+id);
  }

  @Post('update')
  @ApiOperation({ summary: 'Update popular courses' })
  async updatePopularCourses() {
    await this.popularCoursesService.updatePopularCourses();
    return { message: 'Popular courses updated successfully.' };
  }
}
