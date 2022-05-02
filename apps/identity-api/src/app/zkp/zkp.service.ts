import { BadRequestException, Injectable, Logger, NotAcceptableException } from '@nestjs/common';
import {
  BabyjubjubPrivateKeyDto,
  BabyjubjubPublicKeyDto,
  ZkpCreateDto,
  ZkpIdentityDto,
  ZkpKeysDto,
} from '@decentralized-freelance-news/api-shared-lib';
import { PrivateKey, PublicKey } from 'babyjubjub';
import { ZkpInputs } from './zkp.types';
import BN from 'bn.js';
import { sha256 } from 'js-sha256';
import BigNumber from 'bignumber.js';
import { ZokratesProviderService } from './zokrates-provider.service';

@Injectable()
export class ZkpService {
  constructor(private zkpProvider: ZokratesProviderService) {}

  async generateKeys(): Promise<ZkpKeysDto> {
    const privateKeyField = PrivateKey.getRandObj().field;
    const privateKey = new PrivateKey(privateKeyField);
    const publicKey = PublicKey.fromPrivate(privateKey);

    return new ZkpKeysDto({ publicKey, privateKey });
  }

  async generateProof(createDto: ZkpCreateDto): Promise<void> {
    Logger.log('Generating packets and zokrates inputs');
    const inputBuffer = this.objectTo64BytesBuffer(createDto.identity);
    const packets = this.bufferToHexPackets(inputBuffer);
    const zkpInputs = this.keysToZkpInputs(createDto.privateKey, createDto.publicKey, packets);
    Logger.log('Generation of packets and zokrates inputs was a success');

    Logger.log('Computing zokrates witness...');
    const { output } = this.zkpProvider.provider.computeWitness(this.zkpProvider.artifacts, [
      zkpInputs.publicKey,
      zkpInputs.secret,
      zkpInputs.privateKey,
    ]);

    const outputHash = this.reconstructHash(output);
    this.checkHashIntegrity(inputBuffer, outputHash);
  }

  private objectTo64BytesBuffer(object: ZkpIdentityDto): Buffer {
    const str = JSON.stringify(object);
    const buffer = Buffer.alloc(64, '0');
    const dataBuffer = Buffer.from(str);
    if (dataBuffer.length > 64) {
      throw new BadRequestException('The identity object is too large. Maximum size is 64 bytes.');
    }
    dataBuffer.copy(buffer, 64 - dataBuffer.length);
    return buffer;
  }

  private bufferToHexPackets(buffer: Buffer): Array<string> {
    const hexBuffer = buffer.toString('hex');
    const packet1 = hexBuffer.slice(0, 32);
    const packet2 = hexBuffer.slice(32, 64);
    const packet3 = hexBuffer.slice(64, 96);
    const packet4 = hexBuffer.slice(96, 128);
    return [packet1, packet2, packet3, packet4].map((p) => new BN(p, 16).toString(10));
  }

  private keysToZkpInputs(
    privateKey: BabyjubjubPrivateKeyDto,
    publicKey: BabyjubjubPublicKeyDto,
    packets: Array<string>
  ): ZkpInputs {
    return {
      publicKey: [new BigNumber(publicKey.p.x.n).toString(10), new BigNumber(publicKey.p.y.n).toString(10)],
      secret: packets,
      privateKey: new BigNumber(privateKey.s.n).toString(10),
    };
  }

  private reconstructHash(output: string): string {
    const outputObject = JSON.parse(output);
    const hashString1 = outputObject[0][0].toString();
    const hashString2 = outputObject[0][1].toString();
    const numberHash1 = new BN(hashString1);
    const numberHash2 = new BN(hashString2);
    return numberHash1.toString(16) + numberHash2.toString(16);
  }

  private checkHashIntegrity(input: Buffer, outputHash: string): void {
    const inputHash = sha256.hex(input);
    if (inputHash.toString() !== outputHash) {
      throw new NotAcceptableException('The hash integrity was compromised. Input hash does not equal output hash.');
    }
  }
}
