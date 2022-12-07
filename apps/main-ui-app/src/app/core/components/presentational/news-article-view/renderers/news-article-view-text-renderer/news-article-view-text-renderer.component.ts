import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'dfn-main-news-article-view-text-renderer',
  template: `<div class="text-content-renderer-container">
    {{ textContent }}
  </div> `,
  styleUrls: ['news-article-view-text-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsArticleViewTextRendererComponent {
  @Input() textContent: string;
}
