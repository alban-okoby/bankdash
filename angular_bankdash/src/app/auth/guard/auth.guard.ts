import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // DOn't forget to Verify Token validation after
  if ((localStorage.getItem('qsdfghjklmpoiuytreza') == 'ROLE_ADMIN' || localStorage.getItem('qsdfghjklmpoiuytreza') == 'ROLE_USER') ||
  localStorage.getItem('qsdfghjklmpoiuytreza') == 'ROLE_HEAD') {
    return true;
  }
  // Redirect to the login page
  return router.parseUrl('/auth/signin');
};
