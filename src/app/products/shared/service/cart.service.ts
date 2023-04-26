import { Injectable } from '@angular/core';
import { Product, User } from '../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  myCart: Product[] = [];
  userInfo: User | undefined;

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

  setUserInfo(userInfo: User): void {
    this.userInfo = userInfo;
  }

  getUserInfo(): User | undefined {
    return this.userInfo;
  }
}
