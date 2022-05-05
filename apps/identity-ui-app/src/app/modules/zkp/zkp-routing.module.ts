import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZkpRoutesConfig } from './configuration/zkp-routes.config';
import { ZkpLandingPageComponent } from './components/pages/zkp-landing-page/zkp-landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: ZkpRoutesConfig.LandingPage, pathMatch: 'full' },
  {
    path: ZkpRoutesConfig.LandingPage,
    component: ZkpLandingPageComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZkpRoutingModule {}
