import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SearchComponent } from 'src/app/theme/shared/components/search/search.component';
import { TemplateService } from '../service/template.service';

@Component({
  selector: 'app-template-list',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, CommonModule, SearchComponent],
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.scss'
})
export class TemplateListComponent {

  isLoading: boolean = false;

  constructor(
    private route: Router,
    private templateService: TemplateService) {
  }

  navigateToAddEmail() {
    this.route.navigate(['template/add'])
  }

}
