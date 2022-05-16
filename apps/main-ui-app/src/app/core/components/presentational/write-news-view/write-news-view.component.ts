import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dfn-main-write-news-view',
  templateUrl: 'write-news-view.component.html',
  styleUrls: ['write-news-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WriteNewsViewComponent {}
