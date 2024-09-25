import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-organization',
  standalone: true,
  imports: [],
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.scss'
})
export class AddOrganizationComponent {

  constructor(private route: Router){}

  navigateToBack(){
    this.route.navigate(['/'])

  }

}
