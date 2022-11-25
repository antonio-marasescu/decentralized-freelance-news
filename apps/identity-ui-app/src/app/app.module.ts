import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedLibModule } from '@decentralized-freelance-news/shared-lib';
import { LoginPageComponent } from './core/components/pages/auth/login-page/login-page.component';
import { LoginFormViewComponent } from './core/components/presentational/auth/login-form-view/login-form-view.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterFormViewComponent } from './core/components/presentational/auth/register-form-view/register-form-view.component';
import { RegisterPageComponent } from './core/components/pages/auth/register-page/register-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/utils/interceptors/auth-interceptor';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootEffects, RootReducers } from './core/store/app.state';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { NavigationViewComponent } from './core/components/presentational/navigation-view/navigation-view.component';
import { NavigationContainerComponent } from './core/components/containers/navigation-container.component';
import { MainPageComponent } from './core/components/pages/main-page/main-page.component';
import { MainPageViewComponent } from './core/components/presentational/main-page-view/main-page-view.component';
import { CreateKeysViewComponent } from './core/components/presentational/create-keys-view/create-keys-view.component';
import { CreateKeysComponent } from './core/components/containers/create-keys.component';
import { GenerateProofComponent } from './core/components/containers/generate-proof.component';
import { GenerateProofViewComponent } from './core/components/presentational/generate-proof-view/generate-proof-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginFormViewComponent,
    RegisterPageComponent,
    RegisterFormViewComponent,
    NavigationViewComponent,
    NavigationContainerComponent,
    MainPageComponent,
    MainPageViewComponent,
    CreateKeysViewComponent,
    CreateKeysComponent,
    GenerateProofComponent,
    GenerateProofViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedLibModule.forRoot(),
    StoreModule.forRoot(RootReducers),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 42 }) : [],
    EffectsModule.forRoot(RootEffects),
    AppRoutingModule,
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
