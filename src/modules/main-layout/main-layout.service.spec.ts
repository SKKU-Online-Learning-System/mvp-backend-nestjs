import { Test, TestingModule } from '@nestjs/testing';
import { MainLayoutService } from './main-layout.service';

describe('MainLayoutService', () => {
  let service: MainLayoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainLayoutService],
    }).compile();

    service = module.get<MainLayoutService>(MainLayoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
