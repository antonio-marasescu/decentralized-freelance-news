import { Injectable, Logger } from '@nestjs/common';
import Zokrates, { CompilationArtifacts, ZoKratesProvider } from 'zokrates-js/node';
import fs from 'fs';
import { ZKP_PROGRAM_PATH } from './zkp.config';

@Injectable()
export class ZokratesProviderService {
  artifacts: CompilationArtifacts;
  provider: ZoKratesProvider;

  constructor() {
    this.setup();
  }

  private async setup(): Promise<void> {
    Logger.log('Initializing Zokrates...');
    this.provider = await Zokrates.initialize();
    const source = await fs.promises.readFile(ZKP_PROGRAM_PATH, 'utf8');

    Logger.log('Compiling zokrates source...');
    this.artifacts = this.provider.compile(source);
    Logger.log('Compilation of zokrates source was a success');
  }
}
