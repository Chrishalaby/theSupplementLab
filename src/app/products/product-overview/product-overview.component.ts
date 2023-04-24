import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent {
  constructor(private readonly dynamicDialogConfig: DynamicDialogConfig) {}

  productOverview = this.dynamicDialogConfig.data;
  chosenFlavor = this.productOverview.flavors[0];
  chosenQuantity = 1;

  onFlavorChange(event: any) {
    this.chosenFlavor = event.value;
  }

  onQuantityChange(event: any) {
    this.chosenQuantity = event.value;
  }

  responsiveOptions = [
    {
      breakpoint: '1024px',
    },
    {
      breakpoint: '768px',
    },
    {
      breakpoint: '500px',
    },
  ];
}
