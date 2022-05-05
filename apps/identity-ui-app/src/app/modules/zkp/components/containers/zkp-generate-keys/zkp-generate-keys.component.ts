import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ZkpService } from '../../../services/zkp.service';
import { firstValueFrom } from 'rxjs';
import { FileUtils } from '@decentralized-freelance-news/shared-lib';

@Component({
  selector: 'dfn-identity-zkp-generate-keys',
  template: `<dfn-identity-zkp-generate-keys-view
    *ngIf="form"
    [form]="form"
    [isDownloadable]="isDownloadable"
    (generateKeys)="onGenerateKeys()"
    (downloadKeys)="onDownloadKeys()"
  ></dfn-identity-zkp-generate-keys-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZkpGenerateKeysComponent implements OnInit {
  form: FormGroup = null;
  isDownloadable = false;

  constructor(private zkpService: ZkpService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.form = new FormGroup({
      publicKey: new FormControl(null, [Validators.required]),
      privateKey: new FormControl(null, [Validators.required]),
    });
  }

  async onGenerateKeys(): Promise<void> {
    const keys = await firstValueFrom(this.zkpService.generateKeys());
    this.form.patchValue({ privateKey: JSON.stringify(keys.privateKey), publicKey: JSON.stringify(keys.publicKey) });
    this.isDownloadable = true;
    this.changeDetectorRef.detectChanges();
  }

  async onDownloadKeys(): Promise<void> {
    if (!this.isDownloadable) {
      return;
    }
    const contract = this.form.value;
    const fileKeys = FileUtils.makeJsonFileFromObject(contract);
    FileUtils.downloadFile(fileKeys, 'verifier-keys.json');
  }
}
