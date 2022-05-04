import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedLibModule } from '@decentralized-freelance-news/shared-lib';
import { LandingPageComponent } from './core/components/pages/landing-page/landing-page.component';
import { LandingPageViewComponent } from './core/components/presentational/landing-page-view/landing-page-view.component';
import { LoginPageComponent } from './core/components/pages/login-page/login-page.component';
import { LoginFormViewComponent } from './core/components/presentational/login-form-view/login-form-view.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterFormViewComponent } from './core/components/presentational/register-form-view/register-form-view.component';
import { RegisterPageComponent } from './core/components/pages/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootEffects, RootReducers } from './core/store/app.state';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { NavigationViewComponent } from './core/components/presentational/navigation-view/navigation-view.component';
import { NavigationComponent } from './core/components/containers/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageViewComponent,
    LandingPageComponent,
    LoginPageComponent,
    LoginFormViewComponent,
    RegisterPageComponent,
    RegisterFormViewComponent,
    NavigationViewComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedLibModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(RootReducers),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 42 }) : [],
    EffectsModule.forRoot(RootEffects),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
