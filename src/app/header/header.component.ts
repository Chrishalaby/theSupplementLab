import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProxyService } from '../proxy.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/home'],
    },
    {
      label: 'About',
      icon: 'pi pi-fw pi-info-circle',
      routerLink: ['/about'],
    },
    {
      label: 'Products',
      icon: 'pi pi-fw pi-shopping-cart',
      // routerLink: ['/products']
      items: [],
    },
    {
      label: 'Contact',
      icon: 'pi pi-fw pi-phone',
      routerLink: ['/contact'],
    },
  ];

  productTypes: any[] = [];

  constructor(private readonly proxyService: ProxyService) {}

  ngOnInit() {
    this.proxyService
      .Get_Product_type_By_OWNER_ID({ OWNER_ID: 1 })
      .subscribe((data: any) => {
        this.productTypes = data;
        this.productTypes.forEach((element) => {
          if (this.items[2]?.items) {
            this.items[2].items.push({
              label: element.TYPE,
              routerLink: ['/products', element.PRODUCT_TYPE_ID],
            });
          }
        });
      });
  }
}
