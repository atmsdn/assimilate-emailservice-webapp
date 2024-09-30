import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';
import { HttpClient } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { DisallowSpaceDirective } from 'src/app/theme/shared/directives/disallow-space.directive';
import { MiddlespacesAllowDirective } from 'src/app/theme/shared/directives/middlespaces-allow.directive';
import { CapitalizeFirstDirective } from 'src/app/theme/shared/directives/capitalize-first.directive';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, NgSelectModule,DisallowSpaceDirective,MiddlespacesAllowDirective,CapitalizeFirstDirective],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [UserService, HttpClient],
})

export class AddUserComponent implements OnInit {

  submitted: boolean = false;
  userForm!: FormGroup;
  isEditMode: boolean = false;
  fieldTextType?: boolean = false;
  id: any;
  loading: boolean = false;
  roles: any;
  roleList: any[] = [];
  totalRecords: number = 0;
  user: any;
  errorMessage: string = '';
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  notificationMessage: any;
  @ViewChild('alertContainer') alertcontainer!: ElementRef


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activate: ActivatedRoute,
    private userService: UserService,
  ) {
    this.id = this.activate.snapshot.queryParams['id'];
  }

  ngOnInit(): void {
    this.getRoleList();
    this.initializeForm();
    if (this.id) {
      this.isEditMode = true;
      this.getUserById(this.id);
    }
  }

  initializeForm() {
    this.userForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      roleId: new FormControl('', [Validators.required])
    });
  }

  get fc() {
    return this.userForm.controls;
  }

  get fv() {
    return this.userForm.value;
  }

  setValidators() {
    this.userForm.get('password')?.setValidators([]);
    this.userForm.get('password')?.updateValueAndValidity();
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.userForm.invalid) {
      this.loading = false;
      this.errorMessage = "Invalid Form Error.";
      this.showErrorAlert = true;
      setTimeout(() => this.showErrorAlert = false, 3000);
      return;
    }

    const user = this.userForm.value;

    if (!this.id) {
      this.userService.addUser(user).subscribe({
        next: (res: any) => {
          this.showNotification(res);
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error.error.message || "An error occurred while adding the user.";
          this.showErrorAlert = true;
          setTimeout(() => this.showErrorAlert = false, 3000);
        }
      });
    } else {
      const hasChanges = JSON.stringify(user) !== JSON.stringify(this.initialUserData);

      if (hasChanges) {
        this.userService.updateUser(user, this.id).subscribe({
          next: (res: any) => {
            this.loading = false;
            this.showNotification(res);
          },
          error: (error) => {
            this.loading = false;
            this.errorMessage = error.error.message || "An error occurred while updating the user.";
            this.showErrorAlert = true;
            setTimeout(() => this.showErrorAlert = false, 3000);
          }
        });
      } else {
        this.loading = false;
        this.errorMessage = "No changes detected.";
        this.showErrorAlert = true;
        setTimeout(() => this.showErrorAlert = false, 3000);
      }
    }
  }

  initialUserData(initialUserData: any) {
    throw new Error('Method not implemented.');
  }

  closeAlert() {
    this.showSuccessAlert = false;
    this.notificationMessage = '';
  }

  navigateToBackUsers() {
    this.router.navigate(['/user']);
  }

  getRoleList() {
    this.userService.getRoleList().subscribe({
      next: (res: any) => {
        this.roleList = res;
        this.totalRecords = this.roleList.length;
      },
      error: (error) => {
        console.error('Error fetching role list:', error);
      }
    });
  }

  getUserById(id: any): void {
    this.setValidators();
    this.userService.getUserById(id).subscribe({
      next: (response: any) => {
        const user = response;
        this.userForm.patchValue({
          userName: user.userName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          roleId: user.roleId,
          password: ''
        });
      },
      error: (error) => {
        console.error('Error fetching user by ID:', error);
      }
    });
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
        this.notificationMessage = "User added successfully!";
        alertContainer.classList.add('alert-success');
      }

      setTimeout(() => {
        this.showSuccessAlert = false;
        alertContainer.classList.remove('alert-success');
        alertContainer.classList.remove('alert-danger');
        if (res?.id > 0 || res?.success == true) {
          this.navigateToBackUsers();
        }
      }, 3000);
    }, 0);
  }
  togglefieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}

