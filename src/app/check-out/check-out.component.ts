import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from '../products/products.component';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {

  productsCart: Product[] = [];
  infoForm!: FormGroup;
  totalPrice = 0;
  constructor(private readonly dynamicDialogConfig: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.productsCart = this.dynamicDialogConfig.data;
    this.productsCart.forEach((product: Product) => {
      this.totalPrice += parseInt(product.price.toString());
    });

    this.infoForm = this.formBuilder.group({
      placeHolder: 'Contact Form',
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  checkOut(){
    const url = 'https://formspree.io/f/xnqyzvez';
    const data = {
      ...this.infoForm.value,
      products: this.productsCart,
      totalPrice: this.totalPrice
    }
    this.http.post(url, data).subscribe(() => alert('Check Out Complete!'));
    this.ref.close();
  }

  closeCheckOut() {
    this.ref.close();
  }
}
