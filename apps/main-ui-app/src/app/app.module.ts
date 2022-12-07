import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { EthContractLibModule, IpfsToken } from '@decentralized-freelance-news/eth-contract-lib';
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
import { NewsFeedPageComponent } from './core/components/pages/news-feed-page/news-feed-page.component';
import { NewsFeedContainerComponent } from './core/components/containers/news-feed-container.component';
import { NewsFeedViewComponent } from './core/components/presentational/news-feed-view/news-feed-view.component';
import { AccountManagementContainerComponent } from './core/components/containers/account-management-container.component';
import { AccountManagementViewComponent } from './core/components/presentational/account-managemet-view/account-management-view.component';
import { NoAccessContentViewComponent } from './core/components/presentational/no-access-content-view/no-access-content-view.component';
import { NewsIdentityPageComponent } from './core/components/pages/news-identity-page/news-identity-page.component';
import { IdentityVerificationContainerComponent } from './core/components/containers/identity-verification-container.component';
import { IdentityVerificationViewComponent } from './core/components/presentational/identity-verification-view/identity-verification-view.component';
import { CreateArticleContainerComponent } from './core/components/containers/create-article-container.component';
import { CreateArticleViewComponent } from './core/components/presentational/create-article-view/create-article-view.component';
import { NewsCreatePageComponent } from './core/components/pages/news-create-page/news-create-page.component';
import { UploadIpfsModalComponent } from './core/components/containers/modals/upload-ipfs-modal/upload-ipfs-modal.component';
import { create } from 'ipfs-http-client';
import { NewsArticleContainerComponent } from './core/components/containers/news-article-container.component';
import { NewsArticleViewTextRendererComponent } from './core/components/presentational/news-article-view/renderers/news-article-view-text-renderer/news-article-view-text-renderer.component';
import { NewsArticleViewComponent } from './core/components/presentational/news-article-view/news-article-view.component';
import { NewsArticlePageComponent } from './core/components/pages/news-article-page/news-article-page.component';
import { NewsArticleViewMarkdownRendererComponent } from './core/components/presentational/news-article-view/renderers/news-article-view-markdown-renderer/news-article-view-markdown-renderer.component';
import { MarkdownModule } from 'ngx-markdown';
import { SupportValueModalComponent } from './core/components/containers/modals/support-value-modal/support-value-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationViewComponent,
    NavigationContainerComponent,
    NewsFeedPageComponent,
    NewsFeedContainerComponent,
    NewsFeedViewComponent,
    AccountManagementContainerComponent,
    AccountManagementViewComponent,
    NoAccessContentViewComponent,
    NewsIdentityPageComponent,
    IdentityVerificationContainerComponent,
    IdentityVerificationViewComponent,
    CreateArticleContainerComponent,
    CreateArticleViewComponent,
    NewsCreatePageComponent,
    UploadIpfsModalComponent,
    NewsArticleContainerComponent,
    NewsArticleViewTextRendererComponent,
    NewsArticleViewMarkdownRendererComponent,
    NewsArticleViewComponent,
    NewsArticlePageComponent,
    SupportValueModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedLibModule.forRoot(),
    EthContractLibModule.forRoot(),
    MarkdownModule.forRoot(),
    StoreModule.forRoot(RootReducers),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 42 }) : [],
    EffectsModule.forRoot(RootEffects),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: IpfsToken,
      useFactory: () => {
        try {
          return create({
            host: environment.ipfs.host,
            port: environment.ipfs.port,
            protocol: environment.ipfs.protocol,
          });
        } catch (err) {
          console.error('IPFS Token Factory', err);
          throw new Error('Unable to access IPFS node daemon');
        }
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
