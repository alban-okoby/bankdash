import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of, throwError } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HeadersService } from './headers.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router,) {

  }

  API_URL = environment.API_URL + '/auth';
  isLoggedIn = false;


  signIn(userData: any) {
    return this.http.post(`${this.API_URL}/signin`, userData)
    .pipe(
      catchError((error: any) => {
        console.error('Login failed:', error);
        return throwError(() => error);;
      })
    );;
  }

  signUp(userData: any) {
    return this.http.post(`${this.API_URL}/signup`, userData);
  }

  /**
   * Verify a token
   * @param token The token to verify
   * @returns An Observable containing the result of the verification
   */
  verifyToken(token: any): Observable<any> {
    return this.http.post(`${this.API_URL}/token/verify`, token);
  }

  resendToken(token: any): Observable<any> {
    return this.http.post(`${this.API_URL}/token/resend`, token,)
  }

  

  /**
   * Set value in cookie
   * @param key token key
   * @param value token value
   * @param hasExpiration if true, set expiration time to 3600 minutes (1 hour)
   */
  setTokenInCookie(key: any, value: string, hasExpiration?: boolean): void {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + (60 * 24));
    if (hasExpiration) {
      document.cookie = `${key}=${value}; expires=${expires.toUTCString()}; path=/; secure; SameSite=Strict`;
      document.cookie = key + "_expiration" + `=${expires.toUTCString()}; path=/; secure; SameSite=Strict`;
    } else {
      document.cookie = `${key}=${value}; path=/; secure; SameSite=Strict`;
    }
  }

  /**
   * Get cookie by given name
  */
  getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  getExpirationTimeByCookieName(key: string): any {
    const expirationTime = this.getCookie(`${key}_exp`);
    if (expirationTime) {
        return new Date(parseInt(expirationTime));
    }
    return null;
  }
  // delete all cookies by given name
  removeCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; SameSite=Strict`;
  }


  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.removeCookie('YXV0aGVudGljYXRlZCI6dHJ1Z');
    this.removeCookie('_YXV0aGVudGljYXRlZCI6dHJ1Z');
    this.removeCookie('_YXV0aGVudGljYXRlZCI6dHJ1Z_exp');
    this.isLoggedIn = false;
    this.router.navigateByUrl('/auth/signin');
  }
}
