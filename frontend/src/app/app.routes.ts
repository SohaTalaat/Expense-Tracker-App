import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './guards/auth-guard-guard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    component: Register,
    canActivate: [guestGuard]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  // {
  //   path: 'categories',
  //   canActivate: [authGuard],
  //   loadComponent: () => import('./components/categories/categories').then(m => m.Categories)
  // },
  // {
  //   path: 'expenses',
  //   canActivate: [authGuard],
  //   loadComponent: () => import('./components/expenses/expenses').then(m => m.Expenses)
  // },
  // {
  //   path: 'incomes',
  //   canActivate: [authGuard],
  //   loadComponent: () => import('./components/incomes/incomes').then(m => m.Incomes)
  // },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
