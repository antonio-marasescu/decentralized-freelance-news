import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NewsSortOption } from '../../../types/news-filter.types';

@Component({
  selector: 'dfn-main-news-feed-filter-view',
  templateUrl: 'news-feed-filter-view.component.html',
  styleUrls: ['news-feed-filter-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NewsFeedFilterViewComponent {
  SortOptions = NewsSortOption;
  @Input() form: FormGroup;
  @Output() changeSort = new EventEmitter<boolean>();
}
