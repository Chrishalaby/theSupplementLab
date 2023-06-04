import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DataView, DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { debounceTime } from 'rxjs';
import { ProxyService } from 'src/app/proxy.service';
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
    CommonModule,
  ],
  providers: [DialogService, MessageService],
})
export class ProductsComponent {
  products: any[] = [];

  productTypes: any[] = [];

  search: FormControl = new FormControl('');

  @ViewChild('dv') dataView!: DataView;

  prodParamitem = {
    NAME: '',
    DESCRIPTION: '',
    PRODUCT_TYPE_ID_LIST: [] as number[],
    INVENTORY_STATUS_ID_LIST: [] as number[],
  };
  constructor(
    private readonly httpClient: HttpClient,
    private readonly formBuilder: FormBuilder,
    private messageService: MessageService,
    public dialogService: DialogService,
    private readonly proxyService: ProxyService
  ) {}

  ngOnInit(): void {
    this.getProducts();

    this.proxyService
      .Get_Product_type_By_OWNER_ID({ OWNER_ID: 1 })
      .subscribe((data) => {
        this.productTypes = data;
      });

    this.search.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.prodParamitem.NAME = value;
      this.getProducts();
    });
  }

  onSortChange(event: any) {
    this.prodParamitem.PRODUCT_TYPE_ID_LIST[0] = event.value
      .PRODUCT_TYPE_ID as number;

    this.getProducts();
  }

  getProducts() {
    this.proxyService
      .Get_Product_By_Where_InList_Adv(this.prodParamitem)
      .subscribe((data) => {
        this.products = data.My_Result;
        console.log(data);
      });
  }

  showCart() {
    this.dialogService.open(CartProductsComponent, {
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
