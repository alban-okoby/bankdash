import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor(private authService: AuthService) { }

  getAuthHeaders(): HttpHeaders {
    const token = this.authService.getCookie('_YXV0aGVudGljYXRlZCI6dHJ1Z');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
