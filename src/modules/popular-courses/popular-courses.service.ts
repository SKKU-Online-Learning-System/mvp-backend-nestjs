import { Injectable } from '@nestjs/common';
import { CreatePopularCourseDto } from './dto/create-popular-course.dto';
import { UpdatePopularCourseDto } from './dto/update-popular-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PopularCourseEntity } from '../../entities/popular-course.entity';
import { CourseEntity } from '../../entities/course.entity';
import { EnrollmentEntity } from '../../entities/enrollment.entity';

@Injectable()
export class PopularCoursesService {
  constructor(
    @InjectRepository(PopularCourseEntity)
    private popularCourseRepository: Repository<PopularCourseEntity>,
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
    @InjectRepository(EnrollmentEntity)
    private enrollmentRepository: Repository<EnrollmentEntity>,
    
  ) {}

  async getPopularCourses(limit: number, category1?: string): Promise<PopularCourseEntity[]> {
    let query = this.popularCourseRepository
      .createQueryBuilder("popular_courses")
      .leftJoinAndSelect("popular_courses.course", "course")
      .orderBy("popular_courses.enrollmentCount", "DESC")
      .take(limit);

    if (category1) {
      query = query.where("popular_courses.category1 = :category1", { category1 });
    }

    return query.getMany();
  }

  async updatePopularCourses() {
    const courses = await this.courseRepository.find({ relations: ['enrollments', 'category1'] });
  
    const popularCourses = courses.map(course => {
      return {
        course: { id: course.id },
        courseTitle: course.title,
        instructorName: course.instructor,
        enrollmentCount: course.enrollments.length,
        courseCreatedAt: course.createdAt,
        category1: course.category1.name, // Here, instead of id, we are getting the name of the category1
      };
    });
  
    // sort by enrollmentCount
    popularCourses.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
  
    // remove all records
    await this.popularCourseRepository.clear();
  
    // insert new records
    await this.popularCourseRepository.save(popularCourses);
  }

}
