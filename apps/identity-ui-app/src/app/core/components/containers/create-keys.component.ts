import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ZkpService } from '../../services/zkp.service';
import { FileUtils } from '@decentralized-freelance-news/shared-lib';

@Component({
  selector: 'dfn-identity-create-keys',
  template: `<dfn-identity-create-keys-view
    *ngIf="form"
    [form]="form"
    [downloadEnabled]="isDownloadEnabled"
    (downloadKeys)="onDownloadKeys()"
    (createKeys)="onCreateKeys()"
  ></dfn-identity-create-keys-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateKeysComponent implements OnInit {
  form: FormGroup | null = null;
  isDownloadEnabled = false;

  constructor(private zkpService: ZkpService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.form = new FormGroup({
      publicKey: new FormControl(null, [Validators.required]),
      privateKey: new FormControl(null, [Validators.required]),
    });
    this.form.disable();
  }

  async onDownloadKeys(): Promise<void> {
    if (!this.isDownloadEnabled) {
      return;
    }
    const contract = this.form.value;
    const fileKeys = FileUtils.makeJsonFileFromObject(contract);
    FileUtils.downloadFile(fileKeys, 'verifier-keys.json');
  }

  async onCreateKeys(): Promise<void> {
    const keys = await firstValueFrom(this.zkpService.generateKeys());
    this.form.patchValue({
      privateKey: JSON.stringify(keys.privateKey),
      publicKey: JSON.stringify(keys.publicKey),
    });
    this.isDownloadEnabled = true;
    this.changeDetectorRef.detectChanges();
  }
}
