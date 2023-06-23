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

  create(createPopularCourseDto: CreatePopularCourseDto) {
    return 'This action adds a new popularCourse';
  }

  findAll() {
    return `This action returns all popularCourses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} popularCourse`;
  }

  update(id: number, updatePopularCourseDto: UpdatePopularCourseDto) {
    return `This action updates a #${id} popularCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} popularCourse`;
  }
}
