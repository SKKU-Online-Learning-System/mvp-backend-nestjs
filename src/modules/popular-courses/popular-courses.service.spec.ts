import { Test, TestingModule } from '@nestjs/testing';
import { PopularCoursesService } from './popular-courses.service';

describe('PopularCoursesService', () => {
  let service: PopularCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopularCoursesService],
    }).compile();

    service = module.get<PopularCoursesService>(PopularCoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
