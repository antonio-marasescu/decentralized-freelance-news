import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppRoutesConfig } from './core/types/configuration/app-routes.config';
import { LoginPageComponent } from './core/components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './core/components/pages/register-page/register-page.component';
import { AuthGuard } from './core/utils/guards/auth.guard';
import { LandingPageComponent } from './core/components/pages/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: AppRoutesConfig.LandingPage, pathMatch: 'full' },
  {
    path: AppRoutesConfig.LandingPage,
    component: LandingPageComponent,
    children: [
      { path: '', redirectTo: AppRoutesConfig.CreateKeysSubPage, pathMatch: 'full' },
      {
        path: AppRoutesConfig.CreateKeysSubPage,
        component: LoginPageComponent,
      },
      {
        path: AppRoutesConfig.GenerateProofSubPage,
        component: LoginPageComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutesConfig.LoginPage,
    component: LoginPageComponent,
    canActivate: [],
  },
  {
    path: AppRoutesConfig.RegisterPage,
    component: RegisterPageComponent,
    canActivate: [],
  },
  {
    path: '**',
    redirectTo: AppRoutesConfig.LoginPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
