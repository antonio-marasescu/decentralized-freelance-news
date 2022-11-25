import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppRoutesConfig } from './core/types/configuration/app-routes.config';
import { LoginPageComponent } from './core/components/pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './core/components/pages/auth/register-page/register-page.component';
import { AuthGuard } from './core/utils/guards/auth.guard';
import { MainPageComponent } from './core/components/pages/main-page/main-page.component';
import { CreateKeysComponent } from './core/components/containers/create-keys.component';
import { GenerateProofComponent } from './core/components/containers/generate-proof.component';

const routes: Routes = [
  { path: '', redirectTo: AppRoutesConfig.MainPage, pathMatch: 'full' },
  {
    path: AppRoutesConfig.MainPage,
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: AppRoutesConfig.CreateKeysSubPage, pathMatch: 'full' },
      {
        path: AppRoutesConfig.CreateKeysSubPage,
        component: CreateKeysComponent,
      },
      {
        path: AppRoutesConfig.GenerateProofSubPage,
        component: GenerateProofComponent,
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
