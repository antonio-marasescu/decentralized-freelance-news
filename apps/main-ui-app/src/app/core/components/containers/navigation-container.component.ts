import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppRoutesConfig } from '../../configuration/app-routes.config';
import { filter } from 'rxjs';

@Component({
  selector: 'dfn-main-navigation-container',
  template: `<dfn-main-navigation-view
    (navigate)="onNavigate($event)"
    [selectedIndex]="currentIndex"
    ><ng-content></ng-content
  ></dfn-main-navigation-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationContainerComponent implements OnInit {
  currentIndex: 1 | 2 | 3;
  private urlToIndex = {
    [AppRoutesConfig.NewsFeed]: 1,
    [AppRoutesConfig.Identity]: 3,
  };

  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentIndex = this.urlToIndex[event.url.slice(1)];
        this.changeDetectorRef.detectChanges();
      });
  }

  async onNavigate(index: number): Promise<void> {
    switch (index) {
      case 1: {
        await this.router.navigate([AppRoutesConfig.NewsFeed]);
        return;
      }
      case 2: {
        await this.router.navigate([AppRoutesConfig.NewsFeed]);
        return;
      }
      case 3: {
        await this.router.navigate([AppRoutesConfig.Identity]);
        return;
      }
    }
  }
}
