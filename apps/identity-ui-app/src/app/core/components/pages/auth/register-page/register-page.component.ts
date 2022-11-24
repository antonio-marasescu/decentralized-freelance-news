import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutesConfig } from '../../../../types/configuration/app-routes.config';
import { Store } from '@ngrx/store';
import { Register } from '../../../../store/app.actions';

@Component({
  selector: 'dfn-identity-register-page',
  template: `<dfn-identity-register-form-view
    *ngIf="form"
    [form]="form"
    (register)="onRegister()"
    (navigateLogin)="onNavigateLogin()"
  ></dfn-identity-register-form-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup | null = null;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  async onNavigateLogin(): Promise<void> {
    await this.router.navigate([AppRoutesConfig.LoginPage]);
  }

  onRegister(): void {
    if (!this.form.valid) {
      return;
    }
    const payload = this.form.value;
    this.store.dispatch(Register({ payload }));
  }
}
