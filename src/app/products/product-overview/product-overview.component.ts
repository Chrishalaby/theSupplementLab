import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';
import { CartService } from '../shared/service/cart.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
  standalone: true,
  imports: [
    GalleriaModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule,
    CardModule,
  ],
})
export class ProductOverviewComponent {
  constructor(
    private readonly dynamicDialogConfig: DynamicDialogConfig,
    private cartService: CartService,
    private ref: DynamicDialogRef
  ) {}

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

  addToCart() {
    this.productOverview.chosenFlavor = this.chosenFlavor;
    this.productOverview.quantity = this.chosenQuantity;
    this.cartService.addToCart(this.productOverview);

    this.ref.close(true);
  }
}
