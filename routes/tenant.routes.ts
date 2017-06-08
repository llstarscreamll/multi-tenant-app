import { Routes } from '@angular/router';

import { AuthGuard } from './../../auth/guards/auth.guard';

import { ListAndSearchTenantsPage } from './../pages/tenant/list-and-search-tenants.page';
import { TenantFormPage } from './../pages/tenant/tenant-form.page';

/**
 * TenantRoutes.
 *
 * @author  [name] <[<email address>]>
 */
export const TenantRoutes: Routes = [
	{
	  path: 'tenant', canActivate: [AuthGuard], children: [
	      { path: '', component: ListAndSearchTenantsPage, pathMatch: 'full' },
	      { path: 'create', component: TenantFormPage },
	      { path: ':id/edit', component: TenantFormPage },
	      { path: ':id/details', component: TenantFormPage },
	    ]
	  }
];
