import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpClient } from '@angular/common/http';
import { SearchComponent } from 'src/app/theme/shared/components/search/search.component';
import { DataTableComponent } from 'src/app/theme/shared/data-table/data-table/data-table.component';
import { app_customerBulkGridConfig, app_customerTableConfig } from '../model/customer.grid.config.model';
import { DeleteComponent } from 'src/app/theme/shared/delete/delete/delete.component';
import { customer } from '../model/model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSkeletonLoaderModule, SearchComponent, DataTableComponent, DeleteComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
  providers: [CustomerService, HttpClient]
})
export class CustomerListComponent implements OnInit, AfterViewInit {

  searchTerm: string = '';
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  pages: number[] = [];
  totalPages: any;
  count: number = 0;
  errorMessage: string = '';
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  notificationMessage: any;
  cutomerList: any;
  customer: any;
  @ViewChild('alertContainer') alertcontainer!: ElementRef

  tableConfig = app_customerTableConfig;
  paginationConfig = app_customerBulkGridConfig;

  config = {
    searchTerm: this.searchTerm || "",
    pageNumber: this.pageNumber || 1,
    pageSize: this.pageSize || 10
  }

  constructor(
    private customerService: CustomerService,
    private route: Router,
    private modalService: NgbModal
  ) { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.getCustomerList();
  }
  closeAlert() {
    this.showSuccessAlert = false;
    this.notificationMessage = '';
  }

  navigateToAddCustomer() {
    this.route.navigate(['customer/add'])
  }

  navigateToEditCustomer(event: any) {
    this.route.navigate(['customer/edit'], { queryParams: { id: event.id } });
  }

  navigateToViewCustomer(event: any) {
    this.route.navigate(['customer/view'], { queryParams: { id: event.id } });
  }

  getCustomerList(): void {
    this.isLoading = true;
    if (isNaN(this.pageNumber) || this.pageNumber <= 0) {
      this.pageNumber = 1;
    }
    this.customerService.getCustomerList(this.pageSize, this.pageNumber, this.searchTerm).subscribe({
      next: (res: any) => {
        this.cutomerList = res?.rows;
        this.count = res.count;
        this.totalRecords = res.count;
        // this.calculatePages();
      },
      error: (err) => {
        console.error('Error fetching customer list', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }


  searchCustomer(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.config.searchTerm = this.searchTerm;
    this.pageNumber = 1;
    this.config.pageNumber = this.pageNumber;
    this.getCustomerList();
  }

  goToPage(page: number) {
    this.pageNumber = page;
    this.config.pageNumber = this.pageNumber;
    this.getCustomerList();
  }

  changedPageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.config.pageSize = this.pageSize;
    this.getCustomerList();
  }

  confirmDelete(customer: customer) {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.componentInstance.message = 'Are you sure you want to delete this Customer?';

    modalRef.componentInstance.confirmed.subscribe((result: boolean) => {
      if (result) {
        this.deleteCustomer(customer);
      }
    });
  }

  deleteCustomer(customer:customer) {
    const payload = {
      id: customer.id, deleted: true
    };
    this.customerService.deleteCustomerSer(payload).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.showNotification({ success: true, message: 'Customer deleted successfully!' });
        } else {
          this.showNotification({ success: false, message: res.message || 'Failed to delete customer.' });
        }
        this.getCustomerList();
      },
      error: (err) => {
        this.showNotification({ success: false, message: err.error.message || 'Error deleting customer.' });
      },
      complete: () => {
        this.modalService.dismissAll();
      }
    });
  }

  cancelDelete() {
    this.modalService.dismissAll();
  }

  showNotification(res: any) {
    this.showSuccessAlert = true;
    setTimeout(() => {
      const alertContainer = this.alertcontainer.nativeElement;
      alertContainer.classList.remove('alert-success');
      alertContainer.classList.remove('alert-danger');

      if (res?.success === false) {
        this.notificationMessage = res.message || "An error occurred.";
        alertContainer.classList.add('alert-danger');
      } else if (res?.success === true) {
        this.notificationMessage = res.message
        alertContainer.classList.add('alert-success');
      } else {
        this.notificationMessage = "User deleted successfully!";
        alertContainer.classList.add('alert-success');
      }

      setTimeout(() => {
        this.showSuccessAlert = false;
        alertContainer.classList.remove('alert-success');
        alertContainer.classList.remove('alert-danger');
        if (res?.id > 0 || res?.success == true) {
        }
      }, 3000);
    }, 0);
  }
}
