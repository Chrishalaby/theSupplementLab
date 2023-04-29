import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DataView, DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { debounceTime, tap } from 'rxjs';
import { CartProductsComponent } from '../cart-products/cart-products.component';
import { ProductOverviewComponent } from '../product-overview/product-overview.component';
import { Product } from '../shared/model/cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    DataViewModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
  ],
  providers: [DialogService, MessageService],
})
export class ProductsComponent {
  products: Product[] = [];

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

  formGroup: FormGroup = this.formBuilder.group({
    search: '',
    sort: '',
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
    if (event.value) {
      this.sortedCategory = event.value.label;
      this.isNull = true;
    }
    this.httpClient.get<any>('assets/products.json').subscribe((products) => {
      if (this.isNull == true) {
        this.products = products.data.filter((product: Product) => {
          if (Array.isArray(product.type)) {
            return product.type.some(
              (type) => type.toLowerCase() === this.sortedCategory.toLowerCase()
            );
          } else {
            return (
              product.type.toLowerCase() === this.sortedCategory.toLowerCase()
            );
          }
        });

        this.isNull = false;
      } else {
        this.products = products.data;
      }
    });
  }

  showCart() {
    this.dialogService.open(CartProductsComponent, {
      // data: this.productsCart,
      header: 'Your Cart',
      width: '70%',
    });
  }

  showProductOverview(product: Product) {
    this.dialogService
      .open(ProductOverviewComponent, {
        data: product,
        header: 'Product Overview',
        width: '90%',
      })
      .onClose.subscribe((added) => {
        if (added) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product Added To Cart',
          });
        }
      });
  }
}
