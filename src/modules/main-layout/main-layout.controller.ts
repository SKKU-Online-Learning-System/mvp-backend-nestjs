import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MainLayoutService } from './main-layout.service';
import { CreateMainLayoutDto } from './dto/create-main-layout.dto';
// import { UpdateMainLayoutDto } from './dto/update-Main-layout.dto';
import { MainLayout } from 'src/entities/main-layout.entity';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('MainLayout')
@Controller('main-layout')
export class MainLayoutController {
  constructor(private readonly mainLayoutService: MainLayoutService) {}

  @Post('update')
  @ApiOperation({ summary: 'Update main page layout' })
  @ApiResponse({ status: 201, description: 'The main layout has been successfully created.', type: MainLayout })
  create(@Body() createMainLayoutDto: CreateMainLayoutDto[]): Promise<MainLayout[]> {
    return this.mainLayoutService.createFromCourseIds(createMainLayoutDto);
  }

  
  @Get(':order')
  @ApiOperation({ summary: 'Get main page layout by order' })
  @ApiResponse({ status: 200, description: 'The main layouts have been successfully retrieved.', type: MainLayout })
  getByOrder(@Param('order', ParseIntPipe) order: number): Promise<MainLayout[]> {
    return this.mainLayoutService.getByOrder(order);
}

  @Get(':order/:sequence')
  @ApiOperation({ summary: 'Get main page layout' })
  @ApiResponse({ status: 200, description: 'The main layout has been successfully retrieved.', type: MainLayout })
  orderBySequence(@Param('order', ParseIntPipe) order: number, @Param('sequence', ParseIntPipe) sequence: number,): Promise<MainLayout[]> {
    return this.mainLayoutService.getByOrderAndSequence(order, sequence);
  }

  

}
