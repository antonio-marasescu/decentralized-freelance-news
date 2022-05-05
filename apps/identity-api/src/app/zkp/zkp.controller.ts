import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ZKP_FEATURE } from './zkp.config';
import { ZkpCreateDto, ZkpKeysDto, ZkpProofDto } from '@decentralized-freelance-news/api-shared-lib';
import { ZkpService } from './zkp.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags(ZKP_FEATURE.name)
@Controller(ZKP_FEATURE.key)
export class ZkpController {
  constructor(private zkpService: ZkpService) {}

  @UseGuards(JwtAuthGuard)
  @Get('keys')
  @ApiOkResponse({
    description: 'The private and public keys generated.',
    type: ZkpKeysDto,
  })
  async generateKeys(): Promise<ZkpKeysDto> {
    return this.zkpService.generateKeys();
  }

  @UseGuards(JwtAuthGuard)
  @Post('proof')
  @ApiOkResponse({
    description: 'The generated zero knowledge proof.',
    type: ZkpProofDto,
  })
  @ApiNotAcceptableResponse({
    description: 'The hash integrity was compromised.',
  })
  @ApiBadRequestResponse({
    description: 'The identity object is too large. Maximum size is 64 bytes.',
  })
  async generateProof(@Body() createDto: ZkpCreateDto): Promise<ZkpProofDto> {
    return this.zkpService.generateProof(createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('contract')
  @ApiOkResponse({
    description: 'The generated solidity contract code.',
    type: String,
  })
  async generateSolidityContract(): Promise<string> {
    return this.zkpService.generateSolidityContract();
  }
}
