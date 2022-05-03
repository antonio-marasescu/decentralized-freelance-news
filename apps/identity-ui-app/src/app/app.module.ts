import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedLibModule } from '@decentralized-freelance-news/shared-lib';
import { LandingPageComponent } from './core/components/pages/landing-page/landing-page.component';
import { LandingPageViewComponent } from './core/components/presentational/landing-page-view/landing-page-view.component';
import { LoginPageComponent } from './core/components/pages/login-page/login-page.component';
import { LoginPageViewComponent } from './core/components/presentational/login-page-view/login-page-view.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterPageViewComponent } from './core/components/presentational/register-page-view/register-page-view.component';
import { RegisterPageComponent } from './core/components/pages/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageViewComponent,
    LandingPageComponent,
    LoginPageComponent,
    LoginPageViewComponent,
    RegisterPageComponent,
    RegisterPageViewComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, SharedLibModule.forRoot(), AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
