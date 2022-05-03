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

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    PanelModule,
    MenubarModule,
    DividerModule,
    CardModule,
  ],
  exports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    PanelModule,
    MenubarModule,
    DividerModule,
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
