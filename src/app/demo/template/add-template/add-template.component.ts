import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from '../service/template.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-template.component.html',
  styleUrl: './add-template.component.scss'
})
export class AddTemplateComponent implements OnInit{

  submitted: boolean = false;
  templateForm!: FormGroup;
  isEditMode: boolean = false;
  loading: boolean = false;

  get fc() {
    return this.templateForm.controls;
  }

  get fv() {
    return this.templateForm.value;
  }

  constructor(
    private route: Router,
    private templateService: TemplateService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.templateForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z].*"), Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      domain: new FormControl('', [Validators.required]),
    });
  }

  navigateToBack() {
    this.route.navigate(['/template'])
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.templateForm.invalid) {
      this.loading = false;
      return;
    }

    const organization = this.templateForm.value;

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
