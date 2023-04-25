import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CheckOutComponent } from 'src/app/check-out/check-out.component';
import { Product } from '../shared/model/cart.model';
import { CartService } from '../shared/service/cart.service';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss'],
  standalone: true,
  imports: [ButtonModule, DataViewModule],
})
export class CartProductsComponent {
  productsCart: Product[] = [];

  constructor(
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productsCart = this.cartService.getCartItems();
  }

  removeFromCart(product: Product) {
    this.cartService.removeItem(product);
    this.productsCart = this.cartService.getCartItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.productsCart = this.cartService.getCartItems();
  }

  showCheckOut() {
    this.dialogService.open(CheckOutComponent, {
      data: this.productsCart,
      header: 'CheckOut',
      width: '90%',
    });
    this.ref.close();
  }
}
