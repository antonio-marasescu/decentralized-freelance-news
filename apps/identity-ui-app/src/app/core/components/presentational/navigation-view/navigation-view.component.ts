import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IIdentityUserDto } from '@decentralized-freelance-news/api-shared-lib';

@Component({
  selector: 'dfn-identity-navigation-view',
  templateUrl: 'navigation-view.component.html',
  styleUrls: ['navigation-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationViewComponent {
  @Input() currentUser: IIdentityUserDto;
  @Output() logout: EventEmitter<void> = new EventEmitter<void>();
}
