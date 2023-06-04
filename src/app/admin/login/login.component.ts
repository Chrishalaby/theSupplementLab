import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from './service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [PasswordModule, InputTextModule, ReactiveFormsModule, ButtonModule],
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    username: '',
    password: '',
  });

  canLogin: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  onSubmit(): void {
    this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    if (this.authService.canLogin) {
      this.router.navigate(['/product-upload']);
    }
  }
}
