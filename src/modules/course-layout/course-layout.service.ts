
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseLayout } from 'src/entities/course-layout.entity';
import { CreateCourseLayoutDto } from './dto/create-course-layout.dto';
import { CourseService } from '../courses/course/course.service';  // assuming this exists

@Injectable()
export class CourseLayoutService {
  constructor(
    @InjectRepository(CourseLayout)
    private courseLayoutRepository: Repository<CourseLayout>,
    private courseService: CourseService,  // inject the CourseService
  ) {}

  async createFromCourseIds(createCourseLayoutDto: CreateCourseLayoutDto[]): Promise<CourseLayout[]> {
    const courseLayouts = [];

    for (const dto of createCourseLayoutDto) {
      const thumbnailLink = await this.courseService.getThumbnail(dto.courseId);
      const category = await this.courseService.getCategory(dto.courseId);  // new line to get category

      await this.courseLayoutRepository.delete({ category });

      const courseLayout = this.courseLayoutRepository.create({ ...dto, thumbnailLink, category });  // added category here
      courseLayouts.push(courseLayout);
    }

    return this.courseLayoutRepository.save(courseLayouts);
  }

  getByCategoryAndSequence(category: string, sequence: number): Promise<CourseLayout[]> {
    return this.courseLayoutRepository.find({ where: { category, sequence } });
  }
}
