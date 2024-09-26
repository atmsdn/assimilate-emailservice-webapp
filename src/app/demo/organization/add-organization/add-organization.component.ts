import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../service/organization.service';

@Component({
  selector: 'app-add-organization',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.scss'
})
export class AddOrganizationComponent implements OnInit {

  submitted: boolean = false;
  orgForm!: FormGroup;
  isEditMode: boolean = false;
  loading: boolean = false;

  get fc() {
    return this.orgForm.controls;
  }

  get fv() {
    return this.orgForm.value;
  }

  constructor(
    private route: Router,
    private activate: ActivatedRoute,
    private fb: FormBuilder,
    private orgService: OrganizationService
  ) { }

  ngOnInit(): void {
  }

  initializeForm() {
    this.orgForm = this.fb.group({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.email, Validators.required]),
      Domain: new FormControl('', [Validators.required]),
      MobileNo: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      VillageName: new FormControl('', [Validators.required]),
      OrganizationCode: new FormControl('', [Validators.required]),
    });
  }
  navigateToBack() {
    this.route.navigate(['/'])

  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.orgForm.invalid) {
      this.loading = false;
      return;
    }

    const organization = this.orgForm.value;

    // if (!this.id) {
    //   this.userService.addUser(user).subscribe({
    //     next: (res: any) => {
    //       this.loading = false;
    //     },
    //     error: (error) => {
    //       this.loading = false;
    //       setTimeout(() => this.showErrorAlert = false, 3000);
    //     }
    //   });
    // } 

  }

}
