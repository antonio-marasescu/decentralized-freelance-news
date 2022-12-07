import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IpfsAdapterService } from '@decentralized-freelance-news/eth-contract-lib';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'dfn-main-upload-ipfs-modal',
  templateUrl: 'upload-ipfs-modal.component.html',
  styleUrls: ['upload-ipfs-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadIpfsModalComponent {
  file: File | null = null;
  fileAdded = false;

  constructor(
    private dialogRef: MatDialogRef<UploadIpfsModalComponent>,
    private ipfsAdapterService: IpfsAdapterService,
    private snackBarRef: MatSnackBar
  ) {}

  async onFileAdded(event: Event): Promise<void> {
    const element = event.currentTarget as HTMLInputElement;
    const uploadedFile = element.files?.[0];
    if (!uploadedFile) {
      return;
    }
    this.file = uploadedFile;
    this.fileAdded = true;
    this.snackBarRef.open('The file has been added', 'OK', {
      duration: 2000,
      panelClass: ['background-colored-snackbar'],
    });
  }

  async onUpload(): Promise<void> {
    if (!this.fileAdded) {
      return;
    }

    const address = await firstValueFrom(this.ipfsAdapterService.addFile(this.file));
    this.snackBarRef.open('The file has been uploaded to IPFS', 'OK', {
      duration: 4000,
      panelClass: ['background-colored-snackbar'],
    });
    this.dialogRef.close(address);
  }

  async onCancel(): Promise<void> {
    this.dialogRef.close(null);
  }
}
