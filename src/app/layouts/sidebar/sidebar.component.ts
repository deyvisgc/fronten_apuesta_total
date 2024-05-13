import { Component, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import {RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { TokenService } from 'src/app/util/token.service';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[RouterModule, CommonModule, NgIf],

templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems:RouteInfo[]=[];
  addExpandClass(element: string) {
    if (element === "Cerrar Session") {
      this.authService.logout()
    }
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  constructor(
    private authService: AuthService
  ) {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);  }
  ngOnInit() {
  }
}
