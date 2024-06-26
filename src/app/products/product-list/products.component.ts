import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DataView, DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { debounceTime } from 'rxjs';
import { AuthService } from 'src/app/admin/login/service/auth.service';
import { ProductService } from 'src/app/admin/service/product.service';
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
  isLoggedIn: boolean = false;
  productTypeControl: FormControl = new FormControl();
  search: FormControl = new FormControl('');
  id: number = 0;
  @ViewChild('dv') dataView!: DataView;

  prodParamitem = {
    NAME: '',
    DESCRIPTION: '',
    PRODUCT_TYPE_ID_LIST: [] as number[],
    INVENTORY_STATUS_ID_LIST: [] as number[],
  };
  constructor(
    private messageService: MessageService,
    public dialogService: DialogService,
    private readonly proxyService: ProxyService,
    private authService: AuthService,
    private readonly productService: ProductService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.canLogin;

    this.route.paramMap.subscribe((params) => {
      this.id = parseInt(params.get('id') || '0');
      if (this.id) {
        this.prodParamitem.PRODUCT_TYPE_ID_LIST = [this.id];
        this.getProducts();
      } else {
        this.prodParamitem.PRODUCT_TYPE_ID_LIST = [];
      }
    });

    this.proxyService
      .Get_Product_type_By_OWNER_ID({ OWNER_ID: 1 })
      .subscribe((data) => {
        this.productTypes = data;
        const selectedType = this.productTypes.find(
          (type) => type.PRODUCT_TYPE_ID === +this.id
        );
        this.productTypeControl.setValue(selectedType);
      });

    this.search.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.prodParamitem.NAME = value;
      this.getProducts();
    });
  }

  onSortChange(event: any) {
    if (event.value == null) {
      this.prodParamitem.PRODUCT_TYPE_ID_LIST = [];
    } else {
      this.prodParamitem.PRODUCT_TYPE_ID_LIST = [
        event.value.PRODUCT_TYPE_ID as number,
      ];
    }

    this.dataView.first = 0;

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

  onEdit(product: any) {
    this.productService.product = { ...product };
    this.productService.editProduct = true;
    this.router.navigate(['/product-upload']);
  }
  onDelete(product: any) {
    this.proxyService
      .Delete_Product({ PRODUCT_ID: product.PRODUCT_ID })
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product Deleted',
        });
        this.getProducts();
      });
  }
}
