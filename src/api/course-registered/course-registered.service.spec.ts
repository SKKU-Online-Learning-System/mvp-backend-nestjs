import { Test, TestingModule } from '@nestjs/testing';
import { CourseRegisteredService } from './course-registered.service';

describe('CourseRegisteredService', () => {
  let service: CourseRegisteredService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseRegisteredService],
    }).compile();

    service = module.get<CourseRegisteredService>(CourseRegisteredService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
