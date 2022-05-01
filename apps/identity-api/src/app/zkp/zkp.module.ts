import { Module } from '@nestjs/common';
import { ZkpService } from './zkp.service';
import { ZkpController } from './zkp.controller';

@Module({
  imports: [],
  controllers: [ZkpController],
  providers: [ZkpService],
  exports: [],
})
export class ZkpModule {}
