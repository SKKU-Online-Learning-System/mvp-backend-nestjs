import { Test, TestingModule } from '@nestjs/testing';
import { CourseLayoutController } from './course-layout.controller';
import { CourseLayoutService } from './course-layout.service';

describe('CourseLayoutController', () => {
  let controller: CourseLayoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseLayoutController],
      providers: [CourseLayoutService],
    }).compile();

    controller = module.get<CourseLayoutController>(CourseLayoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
