import { Test, TestingModule } from '@nestjs/testing';
import { CourseDoneService } from './course-done.service';

describe('CourseDoneService', () => {
  let service: CourseDoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseDoneService],
    }).compile();

    service = module.get<CourseDoneService>(CourseDoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
