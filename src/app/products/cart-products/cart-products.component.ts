import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CheckOutComponent } from 'src/app/check-out/check-out.component';
import { Product } from '../products.component';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent {

  productsCart: Product[] = [];

  constructor(private readonly dynamicDialogConfig: DynamicDialogConfig,
    public dialogService: DialogService,
    public ref: DynamicDialogRef
    ) { }

  ngOnInit(): void {
    this.productsCart = this.dynamicDialogConfig.data;
  }

  removeFromCart(product: Product) {
    const index = this.productsCart.indexOf(product);
    this.productsCart.splice(index, 1);
  }

  showCheckOut() {
    this.dialogService.open(CheckOutComponent, {
      data: this.productsCart,
      header: 'CheckOut',
      width: '90%'
    });
    this.ref.close();
  }
}
