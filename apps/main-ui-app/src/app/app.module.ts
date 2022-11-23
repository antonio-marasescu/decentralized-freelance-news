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
import { LandingPageComponent } from './core/components/pages/landing-page/landing-page.component';
import { WriteNewsPageComponent } from './core/components/pages/write-news-page/write-news-page.component';
import { NewsListViewComponent } from './core/components/presentational/news-list-view/news-list-view.component';
import { WriteNewsViewComponent } from './core/components/presentational/write-news-view/write-news-view.component';
import { NavigationViewComponent } from './core/components/presentational/navigation-view/navigation-view.component';
import { NewsListContainerComponent } from './core/components/containers/news-list-container/news-list-container.component';
import { WriteNewsContainerComponent } from './core/components/containers/write-news-container/write-news-container.component';
import { NavigationContainerComponent } from './core/components/containers/navigation-container/navigation-container.component';
import { RootEffects, RootReducers } from './core/store/app.state';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    WriteNewsPageComponent,
    NewsListViewComponent,
    WriteNewsViewComponent,
    NavigationViewComponent,
    NewsListContainerComponent,
    WriteNewsContainerComponent,
    NavigationContainerComponent,
  ],
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
