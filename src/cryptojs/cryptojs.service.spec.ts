import { Test, TestingModule } from '@nestjs/testing';
import { CryptojsService } from './cryptojs.service';

describe('CryptojsService', () => {
  let service: CryptojsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptojsService],
    }).compile();

    service = module.get<CryptojsService>(CryptojsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
