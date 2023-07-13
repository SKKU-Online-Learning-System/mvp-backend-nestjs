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
      await this.mainLayoutRepository.manager.transaction(async transactionalEntityManager => {
        const thumbnailLink = await this.courseService.getThumbnail(dto.courseId);
        const category = await this.courseService.getCategory(dto.courseId); 
  
        // find existing entity with the same order and sequence
        const existingEntity = await transactionalEntityManager.findOne(MainLayout, { where: { order: dto.order, sequence: dto.sequence } });
  
        // if it exists, remove it
        if (existingEntity) {
          await transactionalEntityManager.remove(MainLayout, existingEntity);
        }
  
        // create new entity and add it to the mainLayouts array
        const mainLayout = await transactionalEntityManager.create(MainLayout, { ...dto, thumbnailLink, category });  
  
        // save the entity
        const savedMainLayout = await transactionalEntityManager.save(MainLayout, mainLayout);
  
        mainLayouts.push(savedMainLayout);
      });
    }
    return mainLayouts;
  }
  
  getByOrder(order: number): Promise<MainLayout[]> {
    return this.mainLayoutRepository.find({ where: { order } });
  }
  
  getByOrderAndSequence(order: number, sequence: number): Promise<MainLayout[]> {
    return this.mainLayoutRepository.find({ where: { order, sequence } });
  }
}