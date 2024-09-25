import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.scss',
  providers: [CustomerService, HttpClient]
})
export class ViewCustomerComponent implements OnInit {

  id: any;
  customer: any;

  constructor(
    private activate: ActivatedRoute,
    private route: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.id = this.activate.snapshot.queryParams['id'];
    this.getUserById(this.id);
  }

  navigateToBackCustomer() {
    this.route.navigate(['/customer']);
  }

  getUserById(id: any): void {
    this.customerService.getCustomerById(id).subscribe(
      response => {
        this.customer = response;
      },
      error => {
        console.error('Error fetching user:', error);
      }
    );
  }
}


