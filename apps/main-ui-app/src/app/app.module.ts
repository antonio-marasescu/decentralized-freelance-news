import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './core/components/pages/landing-page/landing-page.component';
import { EthContractLibModule } from '@decentralized-freelance-news/eth-contract-lib';

@NgModule({
  declarations: [AppComponent, LandingPageComponent],
  imports: [BrowserModule, EthContractLibModule, RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
