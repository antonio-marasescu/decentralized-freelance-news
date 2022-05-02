import { Module } from '@nestjs/common';
import { ZkpService } from './zkp.service';
import { ZkpController } from './zkp.controller';
import { ZokratesProviderService } from './zokrates-provider.service';

@Module({
  imports: [],
  controllers: [ZkpController],
  providers: [ZkpService, ZokratesProviderService],
  exports: [],
})
export class ZkpModule {}
