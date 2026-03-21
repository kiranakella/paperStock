import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  selectedTabIndex = 0;
  private destroy$ = new Subject<void>();

  private tabRouteMap: { [key: string]: number } = {
    'portfolio': 0,
    'holdings': 1,
    'trade': 2,
    'chart': 3,
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to router navigation events to update tab
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateSelectedTab();
      });
    
    this.updateSelectedTab();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateSelectedTab(): void {
    const url = this.router.url;
    if (url.includes('/holdings')) {
      this.selectedTabIndex = 1;
    } else if (url.includes('/trade')) {
      this.selectedTabIndex = 2;
    } else if (url.includes('/chart')) {
      this.selectedTabIndex = 3;
    } else {
      this.selectedTabIndex = 0; // portfolio default
    }
  }

  onTabChange(index: number): void {
    const tabRoutes = ['portfolio', 'holdings', 'trade', 'chart'];
    this.router.navigate(['/dashboard', tabRoutes[index]]);
  }
}
