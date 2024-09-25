import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SearchComponent } from 'src/app/theme/shared/components/search/search.component';

@Component({
  selector: 'app-organization-list',
  standalone: true,
  imports: [SearchComponent, NgxSkeletonLoaderModule, CommonModule],
  templateUrl: './organization-list.component.html',
  styleUrl: './organization-list.component.scss'
})
export class OrganizationListComponent {

  isLoading: boolean = false;

  constructor(private route: Router){}

  navigateToAddOrg(){
    this.route.navigate(['/organization/add'])
  }

}
