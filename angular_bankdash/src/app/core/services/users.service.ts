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


  /**
   * Returns the current user from the API, 
   * @returns {Observable<Object>} An observable containing the current user
   */
  currentUser() {
    const cu = this.http.get(`${this.USERS_URL}/me`, {headers: this.headers.getAuthHeaders()} );
    return cu;
  }

  /**
   * Verifies if the user is connected or not
   * @returns {boolean} True if the user is connected, false otherwise
   */
  connexionState(): boolean {
    let state: boolean = false;
    this.currentUser().subscribe((res: any) => {
      if (res.status == 200) {
        state = true;
      } else {
        state = false;
      }
    })
    return state;
  }
}
