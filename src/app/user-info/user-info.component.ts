import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CartService } from '../products/shared/service/cart.service';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    CardModule,
    ToastModule,
    InputNumberModule,
  ],
  providers: [MessageService],
})
export class UserInfoComponent {
  infoForm!: FormGroup;

  // countryList = [{ name: 'Lebanon', code: 'LB' }];
  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private messageService: MessageService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: [null, Validators.required],
      address: ['', Validators.required],
      addressExtra: [''],
      // email: ['', Validators.email],
      message: [''],
      // country: [''],
    });
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  goToCheckOut() {
    if (this.infoForm.valid) {
      this.cartService.setUserInfo(this.infoForm.value);
      this.router.navigate(['/checkout']);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all the required fields',
      });
    }
  }
}
