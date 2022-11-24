import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetCurrentUser } from '../../../store/app.actions';
import { ZkpService } from '../../../services/zkp.service';
import { firstValueFrom } from 'rxjs';
import { FileUtils } from '@decentralized-freelance-news/shared-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'dfn-identity-landing-page',
  template: `<dfn-identity-landing-page-view
    (previewContract)="onPreviewContract()"
  ></dfn-identity-landing-page-view>`,
})
export class LandingPageComponent implements OnInit {
  constructor(private store: Store, private zkpService: ZkpService, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(GetCurrentUser());
  }

  async onPreviewContract(): Promise<void> {
    const contract = await firstValueFrom(this.zkpService.generateContract());
    const fileContract = FileUtils.makeFileFromString(contract, '.sol');
    FileUtils.downloadFile(fileContract, 'verifier.sol');
  }
}
