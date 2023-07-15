import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { Category1Entity } from './category1.entity';

@Entity('popular_courses')
export class PopularCourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CourseEntity, { eager: true })
  @JoinColumn({ name: 'course' }) // Join with course id
  course: CourseEntity;

  @Column()
  category1: string;

  @Column()
  courseTitle: string;  // '강좌명' column

  @Column()
  instructorName: string;

  @Column()
  enrollmentCount: number;

  @CreateDateColumn()
  courseCreatedAt: Date; // '강좌 생성일' column

  @CreateDateColumn()
  updatedAt: Date;
}