import { Test, TestingModule } from '@nestjs/testing';
import { CourseLayoutService } from './course-layout.service';

describe('CourseLayoutService', () => {
  let service: CourseLayoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseLayoutService],
    }).compile();

    service = module.get<CourseLayoutService>(CourseLayoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
