import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { RoleGuard } from './core/auth/guards/role.guard';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(m => m.RegisterComponent),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/user-dashboard/user-dashboard.component').then(
        m => m.UserDashboardComponent
      ),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'portfolio',
        pathMatch: 'full',
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./features/user-dashboard/portfolio/portfolio.component').then(
            m => m.PortfolioComponent
          ),
      },
      {
        path: 'holdings',
        loadComponent: () =>
          import('./features/user-dashboard/holdings-table/holdings-table.component').then(
            m => m.HoldingsTableComponent
          ),
      },
      {
        path: 'trade',
        loadComponent: () =>
          import('./features/user-dashboard/trade-form/trade-form.component').then(
            m => m.TradeFormComponent
          ),
      },
      {
        path: 'chart',
        loadComponent: () =>
          import('./features/user-dashboard/price-chart/price-chart.component').then(
            m => m.PriceChartComponent
          ),
      },
    ],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin-dashboard/admin-dashboard.component').then(
        m => m.AdminDashboardComponent
      ),
    canActivate: [RoleGuard],
    data: { role: 'ADMIN' },
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/admin-dashboard/user-management/user-management.component').then(
            m => m.UserManagementComponent
          ),
      },
      {
        path: 'market',
        loadComponent: () =>
          import('./features/admin-dashboard/market-controls/market-controls.component').then(
            m => m.MarketControlsComponent
          ),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/admin-dashboard/analytics/analytics.component').then(
            m => m.AnalyticsComponent
          ),
      },
    ],
  },
  {
    path: 'trade-history',
    loadComponent: () =>
      import('./features/trading/trade-history/trade-history.component').then(
        m => m.TradeHistoryComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/user-dashboard/settings/settings.component').then(
        m => m.SettingsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
