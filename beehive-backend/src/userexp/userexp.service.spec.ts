import { Test, TestingModule } from '@nestjs/testing';
import { UserexpService } from './userexp.service';

describe('UserexpService', () => {
  let service: UserexpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserexpService],
    }).compile();

    service = module.get<UserexpService>(UserexpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
