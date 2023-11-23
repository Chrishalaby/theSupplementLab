import { Component, OnDestroy, OnInit } from '@angular/core';
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
import jsPDF from 'jspdf';
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

import { Subject, takeUntil } from 'rxjs';
import * as XLSX from 'xlsx';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
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
export class CrudComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

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
    private readonly proxyService: ProxyService,
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.initializeProductForm();
    this.getProducts();
    // Load Flavors
    this.proxyService
      .Get_Flavor_By_OWNER_ID({ OWNER_ID: 1 })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.flavors = data.map((flavor) => {
          return { ...flavor, PRODUCT_FLAVOR_ID: -1 };
        });
      });
    // Load product types
    this.proxyService
      .Get_Product_type_By_OWNER_ID({ OWNER_ID: 1 })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.productTypes = data;
      });

    // Load inventory statuses
    this.proxyService
      .Get_Inventory_status_By_OWNER_ID({ OWNER_ID: 1 })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.inventoryStatus = data;
      });
  }

  getProducts() {
    this.proxyService
      .Get_Product_By_Where_InList_Adv(this.prodParamitem)
      .pipe(takeUntil(this.destroy$))
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
        this.addStatusValueDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Status Added Successfully',
        });
      });
  }

  importProducts(event: UploadEvent) {
    if (event.files.length === 0) return;

    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const workBook = XLSX.read(bstr, { type: 'binary' });

      // Loop over each sheet in workbook
      for (const sheetName of workBook.SheetNames) {
        const sheet = workBook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Process the data to fit your product form structure
        // and make the API call to add products
        this.processData(data);
      }
    };

    reader.readAsBinaryString(file);
  }

  processData(data: any[]) {
    const products = [];

    // Assuming the first row is the header
    const headers = data[0];
    const rows = data.slice(1); // all rows except the header

    rows.forEach((row) => {
      let product: { [key: string]: any } = {}; // Define the type of product as an indexable type

      headers.forEach((header: any, index: any) => {
        if (header.toUpperCase() === 'ENTRY_DATE') {
          // Parse the date, assuming the date is in a recognizable format
          product[header] = new Date(row[index]);
        } else {
          // For other fields, use the row data or provide a default value
          product[header] = row[index] || this.getDefaultValue(header);
        }
      });

      products.push(product);
    });

    // Now, products is an array of product objects
    // You can now send this array to your API or process it further as needed
  }

  getDefaultValue(header: string) {
    switch (header.toUpperCase()) {
      case 'PRODUCT_ID':
        return -1;
      case 'NAME':
        return '';
      case 'DESCRIPTION':
        return '';
      case 'PRICE':
        return 0;
      case 'PRODUCT_TYPE_ID':
        return 0;
      case 'INVENTORY_STATUS_ID':
        return 0;
      default:
        return null;
    }
  }

  exportToCSV() {
    this.messageService.add({ severity: 'info', summary: 'Exporting CSV' });

    let csvData = this.convertToCSV(this.products);
    let blob = new Blob([csvData], { type: 'text/csv' });
    let url = window.URL.createObjectURL(blob);

    // Create a link element for the download
    let a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  convertToCSV(objArray: any[]): string {
    const array =
      typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    // Extract headers
    let header = Object.keys(array[0]);
    row += header.join(',');
    row += '\r\n';

    // Loop through each data row
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line !== '') line += ',';

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return row + str;
  }

  async exportToPDF() {
    this.messageService.add({
      severity: 'info',
      summary: 'Exporting PDF',
      detail: 'Might Take Time',
    });
    const doc = new jsPDF();

    for (const product of this.products) {
      let imageUrl = this.getImageUrl(product);
      if (imageUrl) {
        try {
          const imageData = await this.loadImage(imageUrl);
          doc.addImage(imageData, 'JPEG', 10, 10, 50, 50);
        } catch (error) {
          console.error('Error loading image:', error);
        }
      }

      doc.text(`Product ID: ${product.PRODUCT_ID}`, 70, 20);
      doc.text(`Name: ${product.NAME}`, 70, 30);
      doc.text(`Description: ${product.DESCRIPTION}`, 70, 40);
      doc.text(`Price: ${product.PRICE}`, 70, 50);
      doc.text(`Entry Date: ${product.ENTRY_DATE}`, 70, 60);
      doc.text(`Product Type ID: ${product.PRODUCT_TYPE_ID}`, 70, 70);
      doc.text(`Inventory Status ID: ${product.INVENTORY_STATUS_ID}`, 70, 80);

      doc.addPage();
    }

    if (this.products.length > 0) {
      doc.deletePage(doc.getNumberOfPages());
    }

    doc.save('products.pdf');
  }

  getImageUrl(product: any): string | null {
    if (product.My_Uploaded_files && product.My_Uploaded_files.length > 0) {
      return product.My_Uploaded_files[0].My_URL;
    }
    return null;
  }
  async loadImage(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
