import { Test, TestingModule } from '@nestjs/testing';
import { CourseRegisteredController } from './course-registered.controller';

describe('CourseRegisteredController', () => {
  let controller: CourseRegisteredController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseRegisteredController],
    }).compile();

    controller = module.get<CourseRegisteredController>(CourseRegisteredController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
