import { Injectable, Logger } from '@nestjs/common';
import Zokrates, { CompilationArtifacts, SetupKeypair, ZoKratesProvider } from 'zokrates-js/node';
import fs from 'fs';
import { ZKP_ARTIFACTS_ABI, ZKP_ARTIFACTS_PROGRAM, ZKP_KEY_PAIRS, ZKP_PROGRAM_PATH } from './zkp.config';

@Injectable()
export class ZokratesProviderService {
  private encoder = new TextEncoder();
  artifacts: CompilationArtifacts;
  provider: ZoKratesProvider;
  keypair: SetupKeypair;

  constructor() {
    this.setup();
  }

  private async setup(): Promise<void> {
    Logger.log('Initializing Zokrates...');
    this.provider = await Zokrates.initialize();

    if (!ZokratesProviderService.zokratesDataExists()) {
      Logger.log('No persisted Zokrates data found.');
      await this.generateZokratesData();
      await this.persistZokratesData();
      Logger.log('Initializing Zokrates done.');
      return;
    }

    await this.readZokratesData();

    Logger.log('Initializing Zokrates done.');
  }

  private async generateZokratesData(): Promise<void> {
    Logger.log('Generating zokrates artifacts and keypairs...');
    const source = await fs.promises.readFile(ZKP_PROGRAM_PATH, 'utf-8');

    Logger.log('Compiling zokrates source...');
    this.artifacts = this.provider.compile(source);
    Logger.log('Compilation of zokrates source was a success.');

    Logger.log('Setup of program keypairs...');
    this.keypair = this.provider.setup(this.artifacts.program);
    Logger.log('Setup of program keypairs was a success.');
  }

  private async persistZokratesData(): Promise<void> {
    Logger.log('Persisting zokrates data in repository.');
    await fs.promises.writeFile(ZKP_ARTIFACTS_PROGRAM, this.artifacts.program.toString(), 'utf-8');
    await fs.promises.writeFile(ZKP_ARTIFACTS_ABI, JSON.stringify(this.artifacts.abi), 'utf-8');
    await fs.promises.writeFile(ZKP_KEY_PAIRS, JSON.stringify(this.keypair), 'utf-8');
    Logger.log('Persisting zokrates data in repository is done.');
  }

  private async readZokratesData(): Promise<void> {
    const programArtifacts = await fs.promises.readFile(ZKP_ARTIFACTS_PROGRAM, 'utf-8');
    const abiArtifacts = await fs.promises.readFile(ZKP_ARTIFACTS_ABI, 'utf-8');
    const keypairArtifacts = await fs.promises.readFile(ZKP_KEY_PAIRS, 'utf-8');
    const program = this.encoder.encode(programArtifacts);
    const abi = JSON.parse(abiArtifacts);

    this.keypair = JSON.parse(keypairArtifacts);
    this.artifacts = { program, abi };
  }

  private static zokratesDataExists(): boolean {
    return fs.existsSync(ZKP_ARTIFACTS_PROGRAM) && fs.existsSync(ZKP_ARTIFACTS_ABI) && fs.existsSync(ZKP_KEY_PAIRS);
  }
}
