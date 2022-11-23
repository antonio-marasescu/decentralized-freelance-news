import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppRoutesConfig } from '../../../../modules/shared/configuration/app-routes.config';
import { Router } from '@angular/router';
import { Login } from '../../../../modules/shared/store/app.actions';
import { Store } from '@ngrx/store';
import { MenuContainerWrapperItem, MenuContainerWrapperType } from '@decentralized-freelance-news/shared-lib';

@Component({
  selector: 'dfn-identity-login-page',
  template: `
    <dfn-identity-login-form-view
      *ngIf="form"
      [form]="form"
      (login)="onLogin()"
      (navigateRegister)="onNavigateRegister()"
    ></dfn-identity-login-form-view>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  form: FormGroup | null = null;
  items: Array<MenuContainerWrapperItem> = [
    { id: '1', description: 'Sign Up', type: MenuContainerWrapperType.Raised, color: 'primary', zIndex: 0 },
  ];
  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  async onNavigateRegister(): Promise<void> {
    await this.router.navigate([AppRoutesConfig.RegisterPage]);
  }

  onLogin(): void {
    if (!this.form.valid) {
      return;
    }
    const payload = this.form.value;
    this.store.dispatch(Login({ payload }));
  }
}
