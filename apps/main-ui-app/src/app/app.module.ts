import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './core/components/pages/landing-page/landing-page.component';
import { EthContractLibModule } from '@decentralized-freelance-news/eth-contract-lib';
import { LandingPageViewComponent } from './core/components/pages/landing-page/landing-page-view/landing-page-view.component';
import { SharedLibModule } from '@decentralized-freelance-news/shared-lib';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, LandingPageComponent, LandingPageViewComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EthContractLibModule.forRoot(),
    SharedLibModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    StoreModule.forRoot({}),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 42 }) : [],
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
