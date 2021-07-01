import { Module } from '@nestjs/common';
import { UserexpService } from './userexp.service';

@Module({
  providers: [UserexpService]
})
export class UserexpModule {}
