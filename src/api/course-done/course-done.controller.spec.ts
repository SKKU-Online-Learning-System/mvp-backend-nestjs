import { Test, TestingModule } from '@nestjs/testing';
import { CourseDoneController } from './course-done.controller';

describe('CourseDoneController', () => {
  let controller: CourseDoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseDoneController],
    }).compile();

    controller = module.get<CourseDoneController>(CourseDoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
