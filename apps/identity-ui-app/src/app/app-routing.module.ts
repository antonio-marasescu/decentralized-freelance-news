import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppRoutesConfig } from './core/configuration/app-routes.config';
import { LandingPageComponent } from './core/components/pages/landing-page/landing-page.component';
import { LoginPageComponent } from './core/components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './core/components/pages/register-page/register-page.component';

const routes: Routes = [
  { path: '', redirectTo: AppRoutesConfig.LoginPage, pathMatch: 'full' },
  {
    path: AppRoutesConfig.LandingPage,
    component: LandingPageComponent,
    canActivate: [],
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
    redirectTo: AppRoutesConfig.LandingPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
