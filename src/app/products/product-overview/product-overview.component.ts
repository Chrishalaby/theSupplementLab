import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';
import { Product } from '../shared/model/cart.model';
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
  productOverview = this.dynamicDialogConfig.data;
  chosenFlavor = this.productOverview.My_Product_flavor[0]?.My_Flavor?.VALUE;
  chosenQuantity = 1;
  allFlavors = this.productOverview.My_Product_flavor.map(
    (flavor: { My_Flavor: { VALUE: any } }) => flavor.My_Flavor?.VALUE
  );

  constructor(
    private readonly dynamicDialogConfig: DynamicDialogConfig,
    private cartService: CartService,
    private ref: DynamicDialogRef,
    private router: Router
  ) {}

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

  productSentToCart: Product = {} as Product;

  addToCart() {
    this.productSentToCart.chosenFlavor = this.chosenFlavor;
    this.productSentToCart.quantity = this.chosenQuantity;
    this.productSentToCart.image =
      this.productOverview.My_Uploaded_files[0]?.My_URL;
    this.productSentToCart.name = this.productOverview.NAME;
    this.productSentToCart.price = this.productOverview.PRICE;

    this.cartService.addToCart(this.productSentToCart);
    this.ref.close(true);
  }

  buyNow() {
    this.productSentToCart.chosenFlavor = this.chosenFlavor;
    this.productSentToCart.quantity = this.chosenQuantity;
    this.productSentToCart.image =
      this.productOverview.My_Uploaded_files[0]?.My_URL;
    this.productSentToCart.name = this.productOverview.NAME;
    this.productSentToCart.price = this.productOverview.PRICE;

    this.cartService.addToCart(this.productSentToCart);
    this.ref.close(true);
    this.router.navigate(['/user-info']);
  }
}
