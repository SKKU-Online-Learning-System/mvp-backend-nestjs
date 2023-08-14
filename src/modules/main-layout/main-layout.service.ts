import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainLayout } from 'src/entities/main-layout.entity';
import { CreateMainLayoutDto } from './dto/create-main-layout.dto';
import { CourseService } from '../courses/course/course.service';  // assuming this exists
import { User } from 'src/configs/decorator/user.decorator';

@Injectable()
export class MainLayoutService {
  constructor(
    @InjectRepository(MainLayout)
    private mainLayoutRepository: Repository<MainLayout>,
    private courseService: CourseService,  // inject the CourseService
  ) {}

  
  async createFromCourseIds(createMainLayoutDto: CreateMainLayoutDto[]): Promise<MainLayout[]> {
    const mainLayouts = [];
  
    await this.mainLayoutRepository.manager.transaction(async transactionalEntityManager => {
      // First, delete all entities with the same order
      for (const dto of createMainLayoutDto) {
        const existingEntities = await transactionalEntityManager.find(MainLayout, { where: { order: dto.order } });
        if (existingEntities.length > 0) {
          for (const entity of existingEntities) {
            await transactionalEntityManager.remove(MainLayout, entity);
          }
        }
      }

      // Then, create new entities
      for (const dto of createMainLayoutDto) {
        const courseInfo = await this.courseService.getCourseById(dto.courseId, User);
        const category1 = await this.courseService.getCategory(dto.courseId); 
        const mainLayout = await transactionalEntityManager.create(MainLayout, { ...dto, 
          thumbnail: courseInfo.thumbnail, category1: category1, title:courseInfo.title, description:courseInfo.description, instructor:courseInfo.instructor });  
  
        // save the entity
        const savedMainLayout = await transactionalEntityManager.save(MainLayout, mainLayout);
  
        mainLayouts.push(savedMainLayout);
      }
    });
    return mainLayouts;
  }
  
  getByOrder(order: number): Promise<MainLayout[]> {
    return this.mainLayoutRepository.find({ 
        where: { order },
        order: {
            sequence: 'ASC'
        }
    });
}
  
  getByOrderAndSequence(order: number, sequence: number): Promise<MainLayout[]> {
    return this.mainLayoutRepository.find({ where: { order, sequence } });
  }
}