import { Injectable } from '@nestjs/common';
import Zokrates from 'zokrates-js/node';
import fs from 'fs';
import { ZKP_PROGRAM_PATH } from './zkp.config';
import { ZkpCreateDto, ZkpKeysDto } from '@decentralized-freelance-news/api-shared-lib';
import { PrivateKey, PublicKey } from 'babyjubjub';

@Injectable()
export class ZkpService {
  async generateKeys(): Promise<ZkpKeysDto> {
    const privateKeyField = PrivateKey.getRandObj().field;
    const privateKey = new PrivateKey(privateKeyField);
    const publicKey = PublicKey.fromPrivate(privateKey);

    return new ZkpKeysDto({ publicKey, privateKey });
  }

  async generateProof(createDto: ZkpCreateDto): Promise<void> {
    const zokratesProvider = await Zokrates.initialize();
    const source = await fs.promises.readFile(ZKP_PROGRAM_PATH, 'utf8');
    const artifacts = zokratesProvider.compile(source);
  }
}
