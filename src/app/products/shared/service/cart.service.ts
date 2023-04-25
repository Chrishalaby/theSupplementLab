import { Injectable } from '@angular/core';
import { Product } from '../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  myCart: Product[] = [];

  constructor() {}

  addToCart(item: Product): void {
    const itemCopy = { ...item };
    this.myCart.push(itemCopy);
  }

  getCartItems(): Product[] {
    return this.myCart;
  }

  clearCart(): void {
    this.myCart = [];
  }

  removeItem(item: Product): void {
    this.myCart.splice(this.myCart.indexOf(item), 1);
  }
}
