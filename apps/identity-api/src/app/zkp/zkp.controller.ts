import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ZKP_FEATURE } from './zkp.config';
import { ZkpCreateDto, ZkpKeysDto, ZkpProofDto } from '@decentralized-freelance-news/api-shared-lib';
import { ZkpService } from './zkp.service';

@ApiBearerAuth()
@ApiTags(ZKP_FEATURE.name)
@Controller(ZKP_FEATURE.key)
export class ZkpController {
  constructor(private zkpService: ZkpService) {}

  @Get('keys')
  @ApiOkResponse({
    description: 'The private and public keys generated.',
    type: ZkpKeysDto,
  })
  async generateKeys(): Promise<ZkpKeysDto> {
    return this.zkpService.generateKeys();
  }

  @Post('proof')
  async generateProof(@Body() createDto: ZkpCreateDto): Promise<ZkpProofDto> {
    return this.zkpService.generateProof(createDto);
  }
}
