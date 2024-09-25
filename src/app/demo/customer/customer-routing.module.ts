import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';


const routes: Routes = [
    { path: '', component: CustomerListComponent },
    { path: 'add', component: AddCustomerComponent },
    { path: 'edit', component: AddCustomerComponent },
    { path: 'view', component: ViewCustomerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }