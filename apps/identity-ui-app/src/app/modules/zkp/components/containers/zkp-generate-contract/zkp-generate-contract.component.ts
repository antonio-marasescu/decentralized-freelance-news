import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ZkpService } from '../../../services/zkp.service';
import { firstValueFrom } from 'rxjs';
import { FileUtils } from '@decentralized-freelance-news/shared-lib';

@Component({
  selector: 'dfn-identity-zkp-generate-contract',
  template: `<div class="field mt-3">
    <button
      pButton
      type="button"
      label="Download Solidity Contract"
      class="w-full hover:bg-primary-reverse p-button-raised p-button-rounded p-button-lg"
      (click)="onDownloadContract()"
    ></button>
  </div>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZkpGenerateContractComponent {
  constructor(private zkpService: ZkpService) {}

  async onDownloadContract(): Promise<void> {
    const contract = await firstValueFrom(this.zkpService.generateContract());
    const fileContract = FileUtils.makeFileFromString(contract, '.sol');
    FileUtils.downloadFile(fileContract, 'verifier.sol');
  }
}
