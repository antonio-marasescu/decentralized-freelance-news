import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'dfn-main-account-management-view',
  templateUrl: 'account-management-view.component.html',
  styleUrls: ['account-management-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AccountManagementViewComponent {
  @Input() account: string;
  @Input() hasIdentity = false;
  @Output() connect = new EventEmitter<void>();
}
