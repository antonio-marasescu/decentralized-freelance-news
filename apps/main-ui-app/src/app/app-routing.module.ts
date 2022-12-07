import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppRoutesConfig } from './core/configuration/app-routes.config';
import { NewsFeedPageComponent } from './core/components/pages/news-feed-page/news-feed-page.component';
import { NewsIdentityPageComponent } from './core/components/pages/news-identity-page/news-identity-page.component';
import { NewsCreatePageComponent } from './core/components/pages/news-create-page/news-create-page.component';
import { NewsArticlePageComponent } from './core/components/pages/news-article-page/news-article-page.component';

const routes: Routes = [
  { path: '', redirectTo: AppRoutesConfig.NewsFeed, pathMatch: 'full' },
  { path: AppRoutesConfig.NewsFeed, component: NewsFeedPageComponent },
  { path: AppRoutesConfig.NewsArticle, component: NewsArticlePageComponent },
  { path: AppRoutesConfig.CreateArticle, component: NewsCreatePageComponent },
  { path: AppRoutesConfig.Identity, component: NewsIdentityPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
