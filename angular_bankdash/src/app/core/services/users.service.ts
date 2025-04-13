import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../../auth/service/headers.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
USERS_URL = environment.API_URL + '/users';

  constructor(private http: HttpClient, private headers: HeadersService) { }


  currentUser() {
    const cu = this.http.get(`${this.USERS_URL}/me`, {headers: this.headers.getAuthHeaders()} );
    return cu;
  }
}
