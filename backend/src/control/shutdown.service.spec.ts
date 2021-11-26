import { Test, TestingModule } from '@nestjs/testing';
import { ShutdownService } from './shutdown.service';

describe('ShutdownService', () => {
  let provider: ShutdownService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShutdownService],
    }).compile();

    provider = module.get<ShutdownService>(ShutdownService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
