import { Module } from '@nestjs/common';
import { MainLayoutService} from './main-layout.service';
import { MainLayoutController } from './main-layout.controller';
import { CourseModule } from '../courses/course/course.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainLayout } from 'src/entities/main-layout.entity';


@Module({
  imports: [CourseModule, TypeOrmModule.forFeature([MainLayout])],
  controllers: [MainLayoutController],
  providers: [MainLayoutService]
})
export class MainLayoutModule {}
