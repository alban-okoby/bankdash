import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor {

  constructor(private authService: AuthService, private router: Router, private notifService: NotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.notifService.showErrorMessage('Token invalide ou expiré. Déconnexion en cours...');
          setTimeout(() => {
            this.authService.logout();
          }, 1000);
        }
        return throwError(() => error);
      })
    );
  }
}
