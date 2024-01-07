import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';
import { Product } from '../shared/model/cart.model';
import { CartService } from '../shared/service/cart.service';

@Component({
  selector: 'app-offer-overview',
  templateUrl: './offer-overview.component.html',
  styleUrls: ['./offer-overview.component.scss'],
  standalone: true,
  imports: [
    GalleriaModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule,
    CardModule,
  ],
})
export class OfferOverviewComponent {
  constructor(
    private readonly dynamicDialogConfig: DynamicDialogConfig,
    private cartService: CartService,
    private ref: DynamicDialogRef
  ) {}

  productOverview = this.dynamicDialogConfig.data;
  chosenQuantity = 1;

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
    this.productSentToCart.quantity = this.chosenQuantity;
    this.productSentToCart.image =
      this.productOverview.My_Uploaded_files[0]?.My_URL;
    this.productSentToCart.name = this.productOverview.NAME;
    this.productSentToCart.price = this.productOverview.PRICE;

    this.cartService.addToCart(this.productSentToCart);
    this.ref.close(true);
  }
}
