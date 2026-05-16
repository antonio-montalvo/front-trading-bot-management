import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard-page').then(m => m.DashboardPage) },
      { path: 'positions', loadComponent: () => import('./features/positions/pages/positions-page/positions-page').then(m => m.PositionsPage) },
      { path: 'orders', loadComponent: () => import('./features/orders/pages/orders-page/orders-page').then(m => m.OrdersPage) },
      { 
        path: 'strategies', 
        children: [
          { path: '', loadComponent: () => import('./features/strategies/pages/strategy-list-page/strategy-list-page').then(m => m.StrategyListPage) },
          { path: 'new', loadComponent: () => import('./features/strategies/pages/strategy-create-page/strategy-create-page').then(m => m.StrategyCreatePage) },
          { path: ':id', loadComponent: () => import('./features/strategies/pages/strategy-detail-page/strategy-detail-page').then(m => m.StrategyDetailPage) }
        ]
      },
      { path: 'settings', loadComponent: () => import('./features/settings/pages/settings-page/settings-page').then(m => m.SettingsPage) },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
