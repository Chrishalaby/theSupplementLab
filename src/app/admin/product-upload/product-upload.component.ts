import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProxyService } from 'src/app/proxy.service';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    FileUploadModule,
    CommonModule,
    DialogModule,
    MultiSelectModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class ProductUploadComponent implements OnInit {
  addProductForm!: FormGroup;

  flavors: any[] = [];
  productTypes: any[] = [];
  inventoryStatus: any[] = [];
  selectedInventoryStatus!: string;

  addFlavorForm: FormGroup = this.formBuilder.group({
    VALUE: '',
    FLAVOR_ID: -1,
  });

  addTypeForm: FormGroup = this.formBuilder.group({
    TYPE: '',
    PRODUCT_TYPE_ID: -1,
  });

  addStatusForm: FormGroup = this.formBuilder.group({
    VALUE: '',
    INVENTORY_STATUS_ID: -1,
  });

  addFlavorValueDialog: boolean = false;
  addTypeValueDialog: boolean = false;
  addStatusValueDialog: boolean = false;

  constructor(
    private readonly proxyService: ProxyService,
    private readonly formBuilder: FormBuilder,
    private readonly sanitizer: DomSanitizer,
    private readonly messageService: MessageService,
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      PRODUCT_ID: -1,
      NAME: '',
      DESCRIPTION: '',
      PRICE: 0,
      ENTRY_DATE: 0,
      PRODUCT_TYPE_ID: 0,
      INVENTORY_STATUS_ID: 0,
      My_Product_type: [],
      My_Inventory_status: null,
      My_Product_flavor: [],
    });

    this.proxyService
      .Get_Flavor_By_OWNER_ID({ OWNER_ID: 1 })
      .subscribe((data) => {
        this.flavors = data.map((flavor) => {
          return { ...flavor, PRODUCT_FLAVOR_ID: -1 };
        });
      });

    this.proxyService
      .Get_Product_type_By_OWNER_ID({ OWNER_ID: 1 })
      .subscribe((data) => {
        this.productTypes = data;
      });

    this.proxyService
      .Get_Inventory_status_By_OWNER_ID({ OWNER_ID: 1 })
      .subscribe((data) => {
        this.inventoryStatus = data;
      });
  }

  onSubmit() {
    this.addProductForm
      .get('PRODUCT_TYPE_ID')
      ?.patchValue(
        this.addProductForm.get('My_Product_type')?.value.PRODUCT_TYPE_ID
      );

    this.proxyService
      .Edit_Product(this.addProductForm.value)
      .subscribe((data) => {
        this.httpClient
          .post(
            this.proxyService.APIBaseUrl +
              `/Upload_Image?REL_ENTITY=[TBL_PRODUCT]&REL_KEY=${data.PRODUCT_ID}&REL_FIELD=PRODUCT_IMAGE`,
            this.formData
          )
          .subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product Added Successfully',
            });
          });
      });
  }

  files: any[] = [];
  formData: FormData = new FormData();

  onSelectedFile(event: any) {
    if (event.files && event.files.length > 0) {
      for (let file of event.files) {
        this.files.push(file);
      }
    }

    for (let file of this.files) {
      this.formData.append(file.name, file);
    }
  }

  get firstImageUrl() {
    return this.files.length > 0
      ? this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(this.files[0])
        )
      : null;
  }

  addFlavorValue() {
    this.addFlavorForm.get('VALUE')?.patchValue('');
    this.addFlavorValueDialog = true;
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

  addTypeValue() {
    this.addTypeForm.get('TYPE')?.patchValue('');
    this.addTypeValueDialog = true;
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

  addStatusValue() {
    this.addStatusForm.get('VALUE')?.patchValue('');
    this.addStatusValueDialog = true;
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

  updateSelectedInventoryStatus(selectedValue: any): void {
    const selectedStatus = this.inventoryStatus.find(
      (status) => status.INVENTORY_STATUS_ID === selectedValue
    );

    this.selectedInventoryStatus = selectedStatus?.VALUE || '';
  }

  switchToOffer() {
    this.router.navigate(['/offer-upload']);
  }
}
