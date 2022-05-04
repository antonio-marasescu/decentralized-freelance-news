import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { DividerModule } from 'primeng/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    PanelModule,
    MenubarModule,
    DividerModule,
    InputSwitchModule,
    AvatarModule,
    AvatarGroupModule,
    CardModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    PanelModule,
    MenubarModule,
    DividerModule,
    InputSwitchModule,
    AvatarModule,
    AvatarGroupModule,
    CardModule,
  ],
})
export class SharedLibModule {
  static forRoot(): ModuleWithProviders<SharedLibModule> {
    return {
      ngModule: SharedLibModule,
      providers: [],
    };
  }
}
