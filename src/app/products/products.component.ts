import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, tap } from 'rxjs';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';

export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  type: string;
  flavors: object;
  sizes: object;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: Product[] = [];
  productsCart: Product[] = [];
  productForm!: FormGroup;
  sortOrder!: number;
  sortField!: string;
  sortOptions: any[] = [
    {
      label: 'whey',
    },
    {
      label: 'CREATINE',
    },
    {
      label: 'PRE WORKOUT',
    },
    {
      label: 'MASS GAINER',
    },
    {
      label: 'FAT BURNER',
    },
    {
      label: 'VITAMINS',
    },
  ];

  rating = 5;
  formGroup: FormGroup = this.formBuilder.group({
    search: [],
    sort: [],
  });

  @ViewChild('dv') dataView!: DataView;
  constructor(
    private readonly httpClient: HttpClient,
    private readonly formBuilder: FormBuilder,
    private messageService: MessageService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.httpClient
      .get<any>('assets/products.json')
      .pipe(
        tap((products: any) => {
          this.products = products.data;
        })
      )
      .subscribe();
    this.formGroup
      .get('search')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe((e) => {
        this.dataView.filter(e);
      });
  }

  sortedCategory: string = '';
  isNull = false;
  onSortChange(event: any) {
    // this.sortOrder = event.order;
    // this.sortField = event.field;
    if (event.value) {
      this.sortedCategory = event.value.label;
      this.isNull = true;
    }
    this.httpClient.get<any>('assets/products.json').subscribe((products) => {
      if (this.isNull == true) {
        this.products = products.data.filter(
          (product: Product) =>
            product.type === this.sortedCategory.toLowerCase()
        );
        this.isNull = false;
      } else {
        this.products = products.data;
      }
    });
  }

  addToCart(product: Product) {
    this.productsCart.push(product);
    console.log(this.productsCart);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product Added to Cart',
    });
  }

  showCart() {
    this.dialogService.open(ProductDescriptionComponent, {
      data: this.productsCart,
      header: 'Your Cart',
      width: '70%',
    });
  }

  showProductOverview(product: Product) {
    this.dialogService.open(ProductOverviewComponent, {
      data: product,
      header: 'Product Overview',
      width: '90%',
      height: '90%',
    });
  }
}
