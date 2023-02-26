import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/home']
    },
    {
      label: 'About',
      icon: 'pi pi-fw pi-info-circle',
      routerLink: ['/about']
    },
    {
      label: 'Products',
      icon: 'pi pi-fw pi-shopping-cart',
      routerLink: ['/products']
    },
    {
      label: 'Contact',
      icon: 'pi pi-fw pi-phone',
      routerLink: ['/contact']
    }
  ];
}
