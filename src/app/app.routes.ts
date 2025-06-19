import {Routes} from '@angular/router';

export const routes: Routes = [

  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.routes').then((a) => a.reactiveRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes').then((a) => a.countryRoutes),
  },
  {
    path: '**',
    redirectTo: 'reactive',
  }


];
