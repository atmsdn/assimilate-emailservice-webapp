import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthGuard } from './theme/shared/gaurds/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/default/default.component').then((c) => c.DefaultComponent), canActivate: [AuthGuard],
      },
      { path: 'user', loadChildren: () => import('./demo/user-management/user/user.module').then(m => m.UserManagementModule) },

      { path: 'organization', loadChildren: () => import('./demo/organization/organization.module').then(m => m.OrganizationModule) },
      
      { path: 'template', loadChildren: () => import('./demo/template/template.module').then(m => m.TemplateModule) },

      // { path: 'customer', loadChildren: () => import('./demo/customer/customer.module').then(m => m.CustomerModule) },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/pages/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/pages/authentication/register/register.component')
      }
    ]
  },
  { path: 'organization', loadChildren: () => import('./demo/organization/organization.module').then(m => m.OrganizationModule) },
  { path: 'template', loadChildren: () => import('./demo/template/template.module').then(m => m.TemplateModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
