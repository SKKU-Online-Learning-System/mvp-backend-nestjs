import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainLayout } from 'src/entities/main-layout.entity';
import { CreateMainLayoutDto } from './dto/create-main-layout.dto';
import { CourseService } from '../courses/course/course.service';  // assuming this exists

@Injectable()
export class MainLayoutService {
  constructor(
    @InjectRepository(MainLayout)
    private mainLayoutRepository: Repository<MainLayout>,
    private courseService: CourseService,  // inject the CourseService
  ) {}

  
  async createFromCourseIds(createMainLayoutDto: CreateMainLayoutDto[]): Promise<MainLayout[]> {
    const mainLayouts = [];

    for (const dto of createMainLayoutDto) {
      const thumbnailLink = await this.courseService.getThumbnail(dto.courseId);
      const category = await this.courseService.getCategory(dto.courseId); 

      // find existing entity with the same order and sequence
      const existingEntities = await this.mainLayoutRepository.find({ where: { order: dto.order, sequence: dto.sequence } });

      // if it exists, remove it
      if (existingEntities.length > 0) {
        await this.mainLayoutRepository.remove(existingEntities);
      }

      // create new entity and add it to the courseLayouts array
      const mainLayout = this.mainLayoutRepository.create({ ...dto, thumbnailLink, category });  
      mainLayouts.push(mainLayout);
    }

    // save all new entities
    return this.mainLayoutRepository.save(mainLayouts);
  }
  
  getByOrderAndSequence(order: number, sequence: number): Promise<MainLayout[]> {
    return this.mainLayoutRepository.find({ where: { order, sequence } });
  }
}