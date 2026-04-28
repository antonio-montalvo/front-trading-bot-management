import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'positions', loadComponent: () => import('./pages/positions/positions').then(m => m.Positions) },
      { path: 'orders', loadComponent: () => import('./pages/orders/orders').then(m => m.Orders) },
      { path: 'strategy', loadComponent: () => import('./pages/strategy/strategy').then(m => m.Strategy) },
      { path: 'settings', loadComponent: () => import('./pages/settings/settings').then(m => m.Settings) },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
