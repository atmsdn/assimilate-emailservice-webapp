import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateListComponent } from './template-list/template-list.component';
import { AddTemplateComponent } from './add-template/add-template.component';

const routes: Routes = [
  { path: '', component: TemplateListComponent },
  { path: 'add', component: AddTemplateComponent},
  { path: 'edit', component: AddTemplateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
