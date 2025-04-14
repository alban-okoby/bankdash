import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService, StaticRoutes } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class LoggedInterceptor {
  private routes: StaticRoutes = new StaticRoutes()

  constructor(private authService: AuthService, private router: Router, private notifService: NotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status != 401 && req.url.includes('auth')) {
          this.notifService.showSuccessMessage('Bon retour sur BankDash. Redirection à votre compte ...');
          setTimeout(() => {
            this.router.navigate([this.routes.DASHBOARD]);
          }, 700);
        }
        return throwError(() => error);
      })
    );
  }
}
