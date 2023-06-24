import { Injectable } from '@angular/core';
import { Product } from 'src/app/proxy.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}
  product: Product = {} as Product;
  editProduct: boolean = true;
}
