import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MenuContainerWrapperItem } from './menu-container-wrapper.types';
import { isEqual } from 'lodash-es';

@Component({
  selector: 'shared-lib-menu-container-wrapper',
  template: `<shared-lib-menu-container-wrapper-view [items]="sortedItems"></shared-lib-menu-container-wrapper-view>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContainerWrapperComponent implements OnChanges {
  @Input() items: Array<MenuContainerWrapperItem> = [];

  sortedItems: Array<MenuContainerWrapperItem> = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!isEqual(changes['items'].previousValue, changes['items'].currentValue)) {
      this.items = changes['items'].currentValue;
      this.sortedItems = [...this.items].sort((a, b) => a.zIndex - b.zIndex);
      this.changeDetectorRef.markForCheck();
    }
  }
}
