import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../service/organization.service';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-organization',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ToastrModule],
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.scss'
})
export class AddOrganizationComponent implements OnInit {

  submitted: boolean = false;
  orgForm!: FormGroup;
  isEditMode: boolean = false;
  loading: boolean = false;
  id: any;

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
    private orgService: OrganizationService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.orgForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z].*"), Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      domain: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^\d{10}$/)]),
      address: new FormControl('', [Validators.required]),
      villageName: new FormControl('', [Validators.required]),
      organizationCode: new FormControl('', [Validators.required]),
    });
  }

  navigateToBack() {
    this.route.navigate(['/organization'])
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.orgForm.invalid) {
      this.loading = false;
      return;
    }

    const organization = this.orgForm.value;

    if (!this.id) {
      this.orgService.addOrg(organization).subscribe({
        next: (res: any) => {
          this.loading = false;
        },
        error: (error) => {
          this.toastr.error('plz fil');
        }
      });
    }
  }

}
