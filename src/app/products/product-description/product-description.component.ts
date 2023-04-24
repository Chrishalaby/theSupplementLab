import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Product } from '../products.component';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent {

  productsCart!: Product;
  productForm!: FormGroup;
  constructor(private readonly dynamicDialogConfig: DynamicDialogConfig,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productsCart = this.dynamicDialogConfig.data;
    this.productForm = this.formBuilder.group({
      id: [this.productsCart.id],
      name: [this.productsCart.name],
      price: [this.productsCart.price],
      image: [this.productsCart.image],
      type: [this.productsCart.type],
      flavors: [this.productsCart.flavors],
      sizes: [this.productsCart.sizes],
      quantity: 1
    });
  }

  addToCart(): void {
    this.dynamicDialogConfig.data = this.productForm.value;
  }
}
