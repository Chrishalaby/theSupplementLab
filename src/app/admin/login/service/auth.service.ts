import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _canLogin: boolean = false;

  get canLogin(): boolean {
    return this._canLogin;
  }

  login(username: string, password: string): void {
    if (username == 'chady' && password == 'chady123') {
      this._canLogin = true;
    } else {
      this._canLogin = false;
    }
  }

  logout(): void {
    this._canLogin = false;
  }
}
