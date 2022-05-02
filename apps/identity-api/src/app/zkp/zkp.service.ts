import { Injectable, Logger } from '@nestjs/common';
import { ZkpCreateDto, ZkpKeysDto, ZkpProofDto } from '@decentralized-freelance-news/api-shared-lib';
import { PrivateKey, PublicKey } from 'babyjubjub';
import { ZokratesProviderService } from './zokrates-provider.service';
import { ZkpUtils } from './zkp.utils';

@Injectable()
export class ZkpService {
  constructor(private zkpProvider: ZokratesProviderService) {}

  async generateKeys(): Promise<ZkpKeysDto> {
    const privateKeyField = PrivateKey.getRandObj().field;
    const privateKey = new PrivateKey(privateKeyField);
    const publicKey = PublicKey.fromPrivate(privateKey);

    return new ZkpKeysDto({ publicKey, privateKey });
  }

  async generateProof(createDto: ZkpCreateDto): Promise<ZkpProofDto> {
    Logger.log('Generating packets and zokrates inputs');
    const inputBuffer = ZkpUtils.objectTo64BytesBuffer(createDto.identity);
    const packets = ZkpUtils.bufferToHexPackets(inputBuffer);
    const zkpInputs = ZkpUtils.keysToZkpInputs(createDto.privateKey, createDto.publicKey, packets);
    Logger.log('Generation of packets and zokrates inputs was a success');

    Logger.log('Computing zokrates witness...');
    const { witness, output } = this.zkpProvider.provider.computeWitness(this.zkpProvider.artifacts, [
      zkpInputs.publicKey,
      zkpInputs.secret,
      zkpInputs.privateKey,
    ]);

    Logger.log('Reconstructing hash and checking his integrity...');
    const outputHash = ZkpUtils.reconstructHash(output);
    ZkpUtils.checkHashIntegrity(inputBuffer, outputHash);

    Logger.log('Generating Zero Knowledge Proof...');
    const proof = this.zkpProvider.provider.generateProof(
      this.zkpProvider.artifacts.program,
      witness,
      this.zkpProvider.keypair.pk
    );
    Logger.log('Proof was generated.');

    return new ZkpProofDto(proof);
  }

  async generateSolidityContract(): Promise<string> {
    const verifier = this.zkpProvider.provider.exportSolidityVerifier(this.zkpProvider.keypair.vk);
    return verifier.toString();
  }
}
