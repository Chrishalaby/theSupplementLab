import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ProxyService } from 'src/app/proxy.service';
@Component({
  selector: 'app-offer-upload',
  templateUrl: './offer-upload.component.html',
  styleUrls: ['./offer-upload.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FileUploadModule,
    CommonModule,
    InputTextareaModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    ToastModule,
  ],
})
export class OfferUploadComponent implements OnInit {
  addOfferForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private readonly httpClient: HttpClient,
    private readonly proxyService: ProxyService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.addOfferForm = this.formBuilder.group({
      OFFER_ID: -1,
      NAME: '',
      DESCRIPTION: '',
      PRICE: 0,
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

  onSubmit() {
    this.proxyService.Edit_Offer(this.addOfferForm.value).subscribe((data) => {
      this.httpClient
        .post(
          this.proxyService.APIBaseUrl +
            `/Upload_Image?REL_ENTITY=[TBL_OFFER]&REL_KEY=${data.OFFER_ID}&REL_FIELD=OFFER_IMAGE`,
          this.formData
        )
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Offer Added Successfully',
          });
        });
    });
  }

  switchToProduct() {
    this.router.navigate(['/product-upload']);
  }
}
