// Angular import
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit{
  roleId!: number;
  userName: string;

  constructor(){}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.roleId = Number(localStorage.getItem('roleId'))
  }
  

  onLogout(){
    localStorage.removeItem('atUserLogin');
    localStorage.clear();
    window.location.reload();
  }
}
