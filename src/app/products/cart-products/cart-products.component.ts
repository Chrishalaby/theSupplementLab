import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CartService } from '../shared/service/cart.service';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss'],
  standalone: true,
  imports: [ButtonModule, DataViewModule],
})
export class CartProductsComponent {
  productsCart: any[] = [];

  constructor(
    public ref: DynamicDialogRef,
    private cartService: CartService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.productsCart = this.cartService.getCartItems();
  }

  removeFromCart(product: any) {
    this.cartService.removeItem(product);
    this.productsCart = this.cartService.getCartItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.productsCart = this.cartService.getCartItems();
  }

  showCheckOut() {
    this.router.navigate(['/user-info']);
    this.ref.close();
  }
}
