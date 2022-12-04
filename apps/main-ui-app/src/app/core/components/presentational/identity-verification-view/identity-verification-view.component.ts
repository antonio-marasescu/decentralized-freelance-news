import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IdentityStorageClass } from '../../../types/identity-storage-class.types';

@Component({
  selector: 'dfn-main-identity-verification-view',
  templateUrl: 'identity-verification-view.component.html',
  styleUrls: ['identity-verification-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityVerificationViewComponent {
  StorageClasses = IdentityStorageClass;
  @Input() storageClass: IdentityStorageClass = IdentityStorageClass.InMemory;
  @Input() hasIdentityStored = false;
  @Output() storageClassChange = new EventEmitter<IdentityStorageClass>();
  @Output() identityUpload = new EventEmitter<Event>();
}
