import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'dfn-main-news-article-view-markdown-renderer',
  template: `
    <div class="markdown-content-renderer-container">
      <markdown [data]="markdownContent"></markdown>
    </div>
  `,
  styleUrls: ['news-article-view-markdown-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsArticleViewMarkdownRendererComponent {
  @Input() markdownContent: string;
}
