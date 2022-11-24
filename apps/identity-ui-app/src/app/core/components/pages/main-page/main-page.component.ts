import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetCurrentUser } from '../../../store/app.actions';
import { ZkpService } from '../../../services/zkp.service';
import { firstValueFrom } from 'rxjs';
import { FileUtils } from '@decentralized-freelance-news/shared-lib';
import { Router } from '@angular/router';
import { AppRoutesConfig } from '../../../types/configuration/app-routes.config';

@Component({
  selector: 'dfn-identity-main-page',
  template: `
    <dfn-identity-main-page-view
      (previewContract)="onPreviewContract()"
      (generateProof)="onGenerateProof()"
      (createKeys)="onCreateKeys()"
    ></dfn-identity-main-page-view>
  `,
})
export class MainPageComponent implements OnInit {
  constructor(private store: Store, private zkpService: ZkpService, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(GetCurrentUser());
  }

  async onPreviewContract(): Promise<void> {
    const contract = await firstValueFrom(this.zkpService.generateContract());
    const fileContract = FileUtils.makeFileFromString(contract, '.sol');
    FileUtils.downloadFile(fileContract, 'verifier.sol');
  }

  async onCreateKeys(): Promise<void> {
    await this.router.navigate([AppRoutesConfig.MainPage, AppRoutesConfig.CreateKeysSubPage]);
  }

  async onGenerateProof(): Promise<void> {
    await this.router.navigate([AppRoutesConfig.MainPage, AppRoutesConfig.GenerateProofSubPage]);
  }
}
