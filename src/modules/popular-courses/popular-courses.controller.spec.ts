import { Test, TestingModule } from '@nestjs/testing';
import { PopularCoursesController } from './popular-courses.controller';
import { PopularCoursesService } from './popular-courses.service';

describe('PopularCoursesController', () => {
  let controller: PopularCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PopularCoursesController],
      providers: [PopularCoursesService],
    }).compile();

    controller = module.get<PopularCoursesController>(PopularCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
