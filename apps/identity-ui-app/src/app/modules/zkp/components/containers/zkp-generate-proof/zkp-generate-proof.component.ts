import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ZkpService } from '../../../services/zkp.service';
import { IZkpCreateDto } from '@decentralized-freelance-news/api-shared-lib';
import { firstValueFrom } from 'rxjs';
import { FileUtils } from '@decentralized-freelance-news/shared-lib';

@Component({
  selector: 'dfn-identity-zkp-generate-proof',
  template: `<dfn-identity-zkp-generate-proof-view
    *ngIf="form"
    [form]="form"
    (downloadProof)="onDownloadProof()"
  ></dfn-identity-zkp-generate-proof-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZkpGenerateProofComponent implements OnInit {
  form: FormGroup = null;

  constructor(private zkpService: ZkpService) {}

  ngOnInit() {
    this.form = new FormGroup({
      publicKey: new FormControl(null, [Validators.required]),
      privateKey: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      identificationNumber: new FormControl(null, [Validators.required]),
    });
  }

  async onDownloadProof(): Promise<void> {
    if (!this.form.valid) {
      return;
    }
    const formValue = this.form.value;
    const payload: IZkpCreateDto = {
      privateKey: JSON.parse(formValue.privateKey),
      publicKey: JSON.parse(formValue.publicKey),
      identity: {
        name: formValue.name,
        identificationNumber: formValue.identificationNumber,
      },
    };
    const proof = await firstValueFrom(this.zkpService.generateProof(payload));
    const fileKeys = FileUtils.makeJsonFileFromObject(proof);
    FileUtils.downloadFile(fileKeys, 'verifier-proof.json');
  }
}
