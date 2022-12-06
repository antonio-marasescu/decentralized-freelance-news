import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public dialogRef: MatDialogRef<UploadIpfsModalComponent>,
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
  }

  async onUpload(): Promise<void> {
    this.snackBarRef.open('The file has been uploaded to IPFS', 'OK', {
      duration: 4000,
      panelClass: ['background-colored-snackbar'],
    });
    this.dialogRef.close('the ipfs address');
  }

  async onCancel(): Promise<void> {
    this.dialogRef.close(null);
  }
}
