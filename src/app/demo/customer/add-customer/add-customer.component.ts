import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { MiddlespacesAllowDirective } from 'src/app/theme/shared/directives/middlespaces-allow.directive';
import { DisallowSpaceDirective } from 'src/app/theme/shared/directives/disallow-space.directive';
import { CapitalizeFirstDirective } from 'src/app/theme/shared/directives/capitalize-first.directive';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink,MiddlespacesAllowDirective,DisallowSpaceDirective,CapitalizeFirstDirective],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent implements OnInit{

  submitted: boolean = false;
  customerForm!: FormGroup;
  isEditMode: boolean = false;
  id: any;
  loading: boolean = false;
  errorMessage: string = '';
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  notificationMessage: any;
  @ViewChild('alertContainer') alertcontainer!: ElementRef
  roleId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activate: ActivatedRoute,
    private customerService: CustomerService,
  ) {
    this.id = this.activate.snapshot.queryParams['id'];
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.id) {
      this.isEditMode = true;
      this.getCustomerById(this.id);
    }
  }

  initializeForm() {
    this.customerForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });
  }

  get fc() {
    return this.customerForm.controls;
  }

  get fv() {
    return this.customerForm.value;
  }

  initialUserData(initialUserData: any) {
    throw new Error('Method not implemented.');
  }

  closeAlert() {
    this.showSuccessAlert = false;
    this.notificationMessage = '';
  }

  navigateToBackCustomer() {
    this.router.navigate(['/customer']);
  }

  getCustomerById(id: any): void {
    this.customerService.getCustomerById(id).subscribe({
      next: (response: any) => {
        const customer = response;
        this.customerForm.patchValue({
          name: customer.name,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
          address: customer.address,
        });
      },
      error: (error) => {
        console.error('Error fetching customer by ID:', error);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.customerForm.invalid) {
      this.loading = false;
      return;
    }

    const customer = {
      ...this.customerForm.value,
      roleId: 5,
    };

    if (!this.id) {
      // Adding a new customer
      this.customerService.addCustomer(customer).subscribe({
        next: (res: any) => {
          this.loading = false;
          this.submitted = false;

          if (res.success) {
            this.showNotification(res);
          } else {
            this.showNotification(res || "Failed to add customer.");
          }
        },
        error: (error) => {
          this.showNotification(error?.error);
          this.loading = false;
          this.submitted = false;
        },
        complete: () => {
          this.submitted = false;
        }
      });
    } else {
      // Updating an existing customer
      const updatedCustomer = {
        ...this.customerForm.value,
        roleId: this.roleId,
      };

      this.customerService.updateCustomer(updatedCustomer, this.id).subscribe({
        next: (res: any) => {
          this.loading = false;
          this.showNotification(res);
        },
        error: (error) => {
          this.showNotification(error?.error);
          this.loading = false;
          this.submitted = false;
        },
        complete: () => {
          this.submitted = false;
        }
      });
    }
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
      } else if (res?.success === true || res?.id > 0) {
        this.notificationMessage = res.message || "Customer added successfully!";
        alertContainer.classList.add('alert-success');
      } else {
        this.notificationMessage = "Customer added successfully!";
        alertContainer.classList.add('alert-success');
      }

      setTimeout(() => {
        this.showSuccessAlert = false;
        alertContainer.classList.remove('alert-success');
        alertContainer.classList.remove('alert-danger');
        if (res?.id > 0 || res?.success == true) {
          this.navigateToBackCustomer();
        }
      }, 3000);
    }, 0);
  }
}
