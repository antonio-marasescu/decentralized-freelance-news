import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Web3ProviderService } from './services/web3-provider.service';
import { EthereumAdapterService } from './services/ethereum-adapter.service';
import { ZkpVerifierAdapterService } from './services/zkp-verifier-adapter.service';

@NgModule({
  imports: [CommonModule],
  providers: [],
})
export class EthContractLibModule {
  static forRoot(): ModuleWithProviders<EthContractLibModule> {
    return {
      ngModule: EthContractLibModule,
      providers: [Web3ProviderService, EthereumAdapterService, ZkpVerifierAdapterService],
    };
  }
}
