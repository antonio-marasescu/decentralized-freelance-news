import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateArticleViewConfiguration } from './create-article-view.configuration';
import { NewsContentType } from '@decentralized-freelance-news/eth-contract-lib';

@Component({
  selector: 'dfn-main-create-article-view',
  templateUrl: 'create-article-view.component.html',
  styleUrls: ['create-article-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArticleViewComponent {
  ContentType = NewsContentType;
  configuration = CreateArticleViewConfiguration.configuration;
  @Input() form: FormGroup;
  @Input() hasIdentity = false;
  @Output() uploadToIpfs = new EventEmitter<void>();
  @Output() createArticle = new EventEmitter<void>();
}
