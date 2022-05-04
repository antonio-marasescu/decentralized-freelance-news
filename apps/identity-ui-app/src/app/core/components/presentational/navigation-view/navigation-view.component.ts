import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IIdentityUserDto } from '@decentralized-freelance-news/api-shared-lib';

@Component({
  selector: 'dfn-identity-navigation-view',
  templateUrl: 'navigation-view.component.html',
  styleUrls: ['navigation-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationViewComponent {
  @Input() items: MenuItem[];
  @Input() currentUser: IIdentityUserDto;
  @Output() logout: EventEmitter<void> = new EventEmitter<void>();
}
