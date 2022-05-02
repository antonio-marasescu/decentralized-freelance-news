import {
  BabyjubjubPrivateKeyDto,
  BabyjubjubPublicKeyDto,
  ZkpIdentityDto,
} from '@decentralized-freelance-news/api-shared-lib';
import { BadRequestException, NotAcceptableException } from '@nestjs/common';
import BN from 'bn.js';
import { ZkpInputs } from './zkp.types';
import BigNumber from 'bignumber.js';
import { sha256 } from 'js-sha256';

export class ZkpUtils {
  static objectTo64BytesBuffer(object: ZkpIdentityDto): Buffer {
    const str = JSON.stringify(object);
    const buffer = Buffer.alloc(64, '0');
    const dataBuffer = Buffer.from(str);
    if (dataBuffer.length > 64) {
      throw new BadRequestException('The identity object is too large. Maximum size is 64 bytes.');
    }
    dataBuffer.copy(buffer, 64 - dataBuffer.length);
    return buffer;
  }

  static bufferToHexPackets(buffer: Buffer): Array<string> {
    const hexBuffer = buffer.toString('hex');
    const packet1 = hexBuffer.slice(0, 32);
    const packet2 = hexBuffer.slice(32, 64);
    const packet3 = hexBuffer.slice(64, 96);
    const packet4 = hexBuffer.slice(96, 128);
    return [packet1, packet2, packet3, packet4].map((p) => new BN(p, 16).toString(10));
  }

  static keysToZkpInputs(
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

  static reconstructHash(output: string): string {
    const outputObject = JSON.parse(output);
    const hashString1 = outputObject[0][0].toString();
    const hashString2 = outputObject[0][1].toString();
    const numberHash1 = new BN(hashString1);
    const numberHash2 = new BN(hashString2);
    return numberHash1.toString(16) + numberHash2.toString(16);
  }

  static checkHashIntegrity(input: Buffer, outputHash: string): void {
    const inputHash = sha256.hex(input);
    if (inputHash.toString() !== outputHash) {
      throw new NotAcceptableException('The hash integrity was compromised. Input hash does not equal Output hash.');
    }
  }
}
