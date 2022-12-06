import { Injectable } from '@angular/core';
import { AppRoutesConfig } from '../configuration/app-routes.config';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AppRoutingService {
  constructor(private router: Router) {}

  async navigateToNewsFeedPage(): Promise<void> {
    await this.router.navigate([AppRoutesConfig.NewsFeed]);
  }

  async navigateToCreateArticlePage(): Promise<void> {
    await this.router.navigate([AppRoutesConfig.CreateArticle]);
  }

  async navigateToIdentityPage(): Promise<void> {
    await this.router.navigate([AppRoutesConfig.Identity]);
  }
}
