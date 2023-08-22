import { Component, OnInit } from '@angular/core';
// import { Product } from 'src/app/demo/api/product';
// import { ProductService } from 'src/app/demo/service/product.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ProxyService } from 'src/app/proxy.service';
@Component({
  templateUrl: './crud.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    MultiSelectModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class CrudComponent implements OnInit {
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: any[] = [];

  product: any = {};

  selectedProducts: any[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  addProductForm!: FormGroup;
  flavors: any[] = [];
  productTypes: any[] = [];
  inventoryStatus: any[] = [];
  selectedInventoryStatus!: string;
  files: any[] = [];
  formData: FormData = new FormData();

  addStatusForm: FormGroup = this.formBuilder.group({
    VALUE: '',
    INVENTORY_STATUS_ID: -1,
  });

  addFlavorForm: FormGroup = this.formBuilder.group({
    VALUE: '',
    FLAVOR_ID: -1,
  });

  addTypeForm: FormGroup = this.formBuilder.group({
    TYPE: '',
    PRODUCT_TYPE_ID: -1,
  });

  addFlavorValueDialog: boolean = false;
  addTypeValueDialog: boolean = false;
  addStatusValueDialog: boolean = false;

  prodParamitem = {
    NAME: '',
    DESCRIPTION: '',
    PRODUCT_TYPE_ID_LIST: [] as number[],
    INVENTORY_STATUS_ID_LIST: [] as number[],
  };

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private readonly proxyService: ProxyService,
    private readonly formBuilder: FormBuilder,
    private readonly sanitizer: DomSanitizer,
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.initializeProductForm();
    this.getProducts();
    // Load Flavors
    this.proxyService
      .Get_Flavor_By_OWNER_ID({ OWNER_ID: 1 })
      .subscribe((data) => {
        this.flavors = data.map((flavor) => {
          return { ...flavor, PRODUCT_FLAVOR_ID: -1 };
        });
      });
    // Load product types
    this.proxyService
      .Get_Product_type_By_OWNER_ID({ OWNER_ID: 1 })
      .subscribe((data) => {
        this.productTypes = data;
      });

    // Load inventory statuses
    this.proxyService
      .Get_Inventory_status_By_OWNER_ID({ OWNER_ID: 1 })
      .subscribe((data) => {
        this.inventoryStatus = data;
      });
  }

  getProducts() {
    this.proxyService
      .Get_Product_By_Where_InList_Adv(this.prodParamitem)
      .subscribe((data) => {
        this.products = data.My_Result;
        console.log(data);
      });
  }

  initializeProductForm(product?: any) {
    this.addProductForm = this.formBuilder.group({
      PRODUCT_ID: product?.PRODUCT_ID || -1,
      NAME: product?.NAME || '',
      DESCRIPTION: product?.DESCRIPTION || '',
      PRICE: product?.PRICE || 0,
      ENTRY_DATE: product?.ENTRY_DATE || new Date(),
      PRODUCT_TYPE_ID: product?.PRODUCT_TYPE_ID || 0,
      INVENTORY_STATUS_ID: product?.INVENTORY_STATUS_ID || 0,
    });
  }

  saveProduct() {
    // Note: You might want to check for validation before proceeding
    this.proxyService
      .Edit_Product(this.addProductForm.value)
      .subscribe((data: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Saved',
          life: 3000,
        });

        // If there are any files to upload
        if (this.files.length > 0) {
          this.httpClient
            .post(
              this.proxyService.APIBaseUrl +
                `/Upload_Image?REL_ENTITY=[TBL_PRODUCT]&REL_KEY=${data.PRODUCT_ID}&REL_FIELD=PRODUCT_IMAGE`,
              this.formData
            )
            .subscribe(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Image Uploaded',
                life: 3000,
              });
            });
        }
      });
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(product: any) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: any) {
    this.deleteProductDialog = true;
    this.product = { ...product };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.products = this.products.filter(
      (val) => !this.selectedProducts.includes(val)
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000,
    });
    this.selectedProducts = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.proxyService
      .Delete_Product({ PRODUCT_ID: this.product.PRODUCT_ID })
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
        this.getProducts();
      });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  updateSelectedInventoryStatus(selectedValue: any): void {
    const selectedStatus = this.inventoryStatus.find(
      (status) => status.INVENTORY_STATUS_ID === selectedValue
    );

    this.selectedInventoryStatus = selectedStatus?.VALUE || '';
  }

  addStatusValue() {
    this.addStatusForm.get('VALUE')?.patchValue('');
    this.addStatusValueDialog = true;
  }

  addTypeValue() {
    this.addTypeForm.get('TYPE')?.patchValue('');
    this.addTypeValueDialog = true;
  }

  addFlavorValue() {
    this.addFlavorForm.get('VALUE')?.patchValue('');
    this.addFlavorValueDialog = true;
  }
  images: any[] = [];
  onSelectedFile(event: any) {
    if (event.files && event.files.length > 0) {
      for (let file of event.files) {
        const reader = new FileReader();

        reader.onload = (fileEvent: any) => {
          const imageUrl = fileEvent.target.result;
          this.images.push(imageUrl); // if 'images' is the array you want to use for previews
        };

        reader.readAsDataURL(file);
        this.files.push(file);
      }
    }

    for (let file of this.files) {
      this.formData.append(file.name, file);
    }
  }
  deleteImage(image: string) {
    const index = this.images.indexOf(image);
    if (index > -1) {
      this.images.splice(index, 1);
      this.files.splice(index, 1); // assuming that the order in the 'files' array corresponds to the 'images' array
    }
  }

  addFlavor() {
    this.proxyService
      .Edit_Flavor(this.addFlavorForm.value)
      .subscribe((data) => {
        this.flavors.push(data);
      });
    this.addFlavorValueDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Flavor Added Successfully',
    });
  }

  addType() {
    this.proxyService
      .Edit_Product_type(this.addTypeForm.value)
      .subscribe((data) => {
        this.productTypes.push(data);
      });

    this.addTypeValueDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Type Added Successfully',
    });
  }

  addStatus() {
    this.proxyService
      .Edit_Inventory_status(this.addStatusForm.value)
      .subscribe((data) => {
        this.inventoryStatus.push(data);
      });

    this.addStatusValueDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Status Added Successfully',
    });
  }
}
