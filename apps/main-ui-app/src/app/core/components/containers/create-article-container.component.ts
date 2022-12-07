import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { UploadIpfsModalComponent } from './modals/upload-ipfs-modal/upload-ipfs-modal.component';
import { firstValueFrom } from 'rxjs';
import { INewsModelCreateDto } from '@decentralized-freelance-news/eth-contract-lib';
import { CreateNewsArticle } from '../../store/app.actions';
import { isNil } from 'lodash-es';

@Component({
  selector: 'dfn-main-create-article-container',
  template: `
    <ng-container *ngIf="form">
      <dfn-main-create-article-view
        [form]="form"
        (uploadToIpfs)="onUploadToIpfs()"
        (createArticle)="onCreateArticle()"
      ></dfn-main-create-article-view>
    </ng-container>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArticleContainerComponent implements OnInit {
  form: FormGroup;

  constructor(private store: Store, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      ipfsAddress: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      summary: new FormControl(null, [Validators.required]),
      contentType: new FormControl(null, [Validators.required]),
    });
  }

  async onUploadToIpfs(): Promise<void> {
    const dialogRef = this.matDialog.open(UploadIpfsModalComponent, {
      height: '400px',
      width: '600px',
      autoFocus: false,
    });
    const dialogResult = await firstValueFrom(dialogRef.afterClosed());
    if (isNil(dialogResult)) {
      return;
    }
    this.form.patchValue({ ipfsAddress: dialogResult });
  }

  async onCreateArticle(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    const article: INewsModelCreateDto = this.form.value;
    this.store.dispatch(CreateNewsArticle({ article }));
  }
}
