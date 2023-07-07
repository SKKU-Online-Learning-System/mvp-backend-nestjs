import { Test, TestingModule } from '@nestjs/testing';
import { MainLayoutController } from './main-layout.controller';
import { MainLayoutService } from './main-layout.service';

describe('MainLayoutController', () => {
  let controller: MainLayoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainLayoutController],
      providers: [MainLayoutService],
    }).compile();

    controller = module.get<MainLayoutController>(MainLayoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
