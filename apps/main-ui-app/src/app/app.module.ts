import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { EthContractLibModule } from '@decentralized-freelance-news/eth-contract-lib';
import { SharedLibModule } from '@decentralized-freelance-news/shared-lib';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { RootEffects, RootReducers } from './core/store/app.state';
import { NavigationViewComponent } from './core/components/presentational/navigation-view/navigation-view.component';
import { NavigationContainerComponent } from './core/components/containers/navigation-container.component';

@NgModule({
  declarations: [AppComponent, NavigationViewComponent, NavigationContainerComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedLibModule.forRoot(),
    EthContractLibModule.forRoot(),
    StoreModule.forRoot(RootReducers),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 42 }) : [],
    EffectsModule.forRoot(RootEffects),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
