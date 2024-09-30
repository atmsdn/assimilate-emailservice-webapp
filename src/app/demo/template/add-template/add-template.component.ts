import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from '../service/template.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';


@Component({
  selector: 'app-add-template',
  standalone: true,
  imports: [CommonModule, NgxEditorModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-template.component.html',
  styleUrl: './add-template.component.scss'
})
export class AddTemplateComponent implements OnInit {

  submitted: boolean = false;
  templateForm!: FormGroup;
  isEditMode: boolean = false;
  loading: boolean = false;
  editor: Editor;
  html: string = `<section class="mail-success section mt-5">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-12">
        <!-- Success Message Inner -->
        <div class="text-center">
          <h1 class="display-1 text-primary">
            <i class="fas fa-envelope"></i>
          </h1>
          <h2>Your Mail Sent Successfully!</h2>
          <p class="lead">
            Aenean eget sollicitudin lorem, et pretium felis. Nullam euismod diam libero, sed dapibus leo laoreet ut. Suspendisse potenti. Phasellus urna lacus.
          </p>
          <a href="#" class="btn btn-primary btn-lg">Go Home</a>
        </div>
        <!-- End Success Message Inner -->
      </div>
    </div>
  </div>
</section>
`;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['superscript', 'subscript'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    ['indent', 'outdent'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['undo', 'redo'],
  ];

  constructor(
    private route: Router,
    private templateService: TemplateService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.editor = new Editor();
  }

  get fc() {
    return this.templateForm.controls;
  }  

  initializeForm() {
    this.templateForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z].*"), Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      domain: new FormControl('', [Validators.required]),
      emailBody: new FormControl(this.html, Validators.required) 
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
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
