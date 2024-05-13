
import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth.guard';

export const Approutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'page',
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./page/page.module').then(m => m.PageModule), canActivate: [AuthGuard]
      }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];
