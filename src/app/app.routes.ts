import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./navigation/basics/basics.component').then(mod => mod.BasicsComponent),
  },
  {
    path: 'ui/bootstrap',
    loadComponent: () => import('./navigation/ui/bootstrap/bootstrap.component').then(mod => mod.BootstrapComponent),
  },
  {
    path: 'ui/tailwind',
    loadComponent: () => import('./navigation/ui/tailwind/tailwind.component').then(mod => mod.TailwindComponent),
  },
];
