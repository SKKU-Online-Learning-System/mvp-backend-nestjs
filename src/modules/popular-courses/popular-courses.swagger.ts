import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePopularCourseDto {
  @ApiProperty({
    description: 'Course ID',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @ApiProperty({
    description: 'Course title',
    type: String,
  })
  @IsNotEmpty()
  courseTitle: string;

  @ApiProperty({
    description: 'Instructor name',
    type: String,
  })
  @IsNotEmpty()
  instructorName: string;

  @ApiProperty({
    description: 'Enrollment count',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  enrollmentCount: number;

  @ApiProperty({
    description: 'Course creation date',
    type: Date,
  })
  @IsNotEmpty()
  courseCreatedAt: Date;

  @ApiProperty({
    description: 'Category1 name',
    type: String,
  })
  @IsNotEmpty()
  category1: string;
}
