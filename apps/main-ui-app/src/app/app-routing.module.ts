import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppRoutesConfig } from './core/configuration/app-routes.config';
import { LandingPageComponent } from './core/components/pages/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: AppRoutesConfig.LandingPage, pathMatch: 'full' },
  {
    path: AppRoutesConfig.LandingPage,
    component: LandingPageComponent,
    canActivate: []
  },
  {
    path: '**',
    redirectTo: AppRoutesConfig.LandingPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
