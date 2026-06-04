import { HttpClient } from '@angular/common/http';
import { AutSpecs, AuthResponseData, SignIn } from './sign.in.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _tokenExpirationTimer?: NodeJS.Timeout;
  private _tokenExpirationDate: Date = new Date();
  private _token = '';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  login(payload: SignIn) {
    const firebaseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`;
    this.http
      .post<AuthResponseData>(firebaseUrl, {
        ...payload,
        returnSecureToken: true,
      })
      .subscribe({
        next: (res) => this.handleAuthentication(res.idToken, +res.expiresIn),
        error: () => alert('Invalid Credentials'),
      });
  }

  autoLogout(expirationDuration: number) {
    this._tokenExpirationTimer = setTimeout(
      () => this.logout(),
      expirationDuration,
    );
  }

  logout() {
    this.router.navigate(['']);
    localStorage.removeItem(AutSpecs.LOCAL_STORAGE_KEY);

    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
    }
  }

  autoLogin() {
    const userData: {
      token: string;
      expirationDate: string;
    } = JSON.parse(localStorage.getItem(AutSpecs.LOCAL_STORAGE_KEY) || '{}');
    if (!userData) {
      return;
    }

    this._tokenExpirationDate = new Date(userData.expirationDate);
    this._token = userData.token;

    if (this.token) {
      const expirationDuration =
        new Date(userData.expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.router.navigate(['/admin/main']);
    }
  }

  private handleAuthentication(token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    this._tokenExpirationDate = expirationDate;

    this.autoLogout(expiresIn * 1000);
    localStorage.setItem(
      AutSpecs.LOCAL_STORAGE_KEY,
      JSON.stringify({ token, expirationDate }),
    );
    this.router.navigate(['/admin/main']);
  }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
