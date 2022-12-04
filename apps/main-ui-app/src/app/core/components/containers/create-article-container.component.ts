import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dfn-main-create-article-container',
  template: `
    <ng-container>
      <dfn-main-create-article-view></dfn-main-create-article-view>
    </ng-container>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArticleContainerComponent {}
