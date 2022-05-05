import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppRoutesConfig } from './modules/shared/configuration/app-routes.config';
import { LoginPageComponent } from './core/components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './core/components/pages/register-page/register-page.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: AppRoutesConfig.ZkpModule, pathMatch: 'full' },
  {
    path: AppRoutesConfig.ZkpModule,
    loadChildren: () => import('./modules/zkp/zkp.module').then((m) => m.ZkpModule),
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
