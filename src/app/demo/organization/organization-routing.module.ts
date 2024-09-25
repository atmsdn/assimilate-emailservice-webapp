import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { AddOrganizationComponent } from './add-organization/add-organization.component';

const routes: Routes = [
  { path: '', component: OrganizationListComponent },
  { path: 'add', component: AddOrganizationComponent },
  { path: 'edit', component: AddOrganizationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
