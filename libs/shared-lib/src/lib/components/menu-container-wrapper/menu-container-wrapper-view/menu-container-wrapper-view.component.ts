import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuContainerWrapperItem, MenuContainerWrapperType } from '../menu-container-wrapper.types';

@Component({
  selector: 'shared-lib-menu-container-wrapper-view',
  templateUrl: 'menu-container-wrapper-view.component.html',
  styleUrls: ['menu-container-wrapper-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContainerWrapperViewComponent {
  @Input() items: Array<MenuContainerWrapperItem>;

  ItemTypes = MenuContainerWrapperType;
  trackById = (index: number, item: MenuContainerWrapperItem) => item.id;
}
