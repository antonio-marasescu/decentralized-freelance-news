import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ZkpService } from '../../services/zkp.service';
import { IZkpCreateDto } from '@decentralized-freelance-news/api-shared-lib';
import { firstValueFrom } from 'rxjs';
import { FileUtils } from '@decentralized-freelance-news/shared-lib';
import { ProofKeys } from '../../types/zkp-form.types';

@Component({
  selector: 'dfn-identity-generate-proof',
  template: `<dfn-identity-generate-proof-view
    *ngIf="form"
    [form]="form"
    (importKeys)="onImportKeys($event)"
    (downloadProof)="onDownloadProof()"
  ></dfn-identity-generate-proof-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateProofComponent implements OnInit {
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

  async onImportKeys(data: Event): Promise<void> {
    const element = data.currentTarget as HTMLInputElement;
    const uploadedFile = element.files?.[0];
    if (!uploadedFile) {
      return;
    }
    const keys = await FileUtils.readFileContentAsJson<ProofKeys>(uploadedFile);
    this.form.patchValue({ publicKey: keys.publicKey, privateKey: keys.privateKey });
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
