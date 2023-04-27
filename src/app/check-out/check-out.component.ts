import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Product, User } from '../products/shared/model/cart.model';
import { CartService } from '../products/shared/service/cart.service';

interface CartItem {
  id: number;
  quantity: number;
  chosenFlavor: string;
}
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    CommonModule,
    InputTextModule,
    CardModule,
    ButtonModule,
  ],
})
export class CheckOutComponent {
  productsCart: Product[] = [];
  userInfo: User | undefined;

  totalPrice = 0;
  displayDialog = false;

  date = new Date().toLocaleDateString().split('/').join('-');

  invoiceNumber = Math.floor(Math.random() * 1000000);
  customerId = Math.floor(Math.random() * 1000000);

  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.productsCart = this.cartService.getCartItems();
    this.cartItems = this.getOrderDetails();
    this.userInfo = this.cartService.getUserInfo();

    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.productsCart.reduce(
      (total: number, product: Product) => {
        return total + product.price * product.quantity;
      },
      0
    );
  }

  getOrderDetails() {
    return this.productsCart.map((product: Product) => {
      return {
        id: product.id,
        quantity: product.quantity,
        chosenFlavor: product.chosenFlavor,
      };
    });
  }

  checkOut() {
    const url = 'https://formspree.io/f/xnqyzvez';
    const data = {
      userInfo: this.userInfo,
      products: this.cartItems,
      totalPrice: this.totalPrice,
      invoice: this.invoiceNumber,
      customerId: this.customerId,
    };
    this.http.post(url, data).subscribe();
    this.displayDialog = true;
  }
}
