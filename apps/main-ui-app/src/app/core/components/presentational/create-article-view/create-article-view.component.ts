import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dfn-main-create-article-view',
  templateUrl: 'create-article-view.component.html',
  styleUrls: ['create-article-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArticleViewComponent {}
