import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

// Custom elements
import { AuthService } from '../service/auth.service';
import { LoginRequest } from '../models/login.request';
import { Routes } from '../../core/routes/routes';
import { SharedModule } from '../../shared/shared.module';
import { NotificationService } from '../../core';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  routes: Routes = new Routes();
  showPassword: string = 'password';
  show = false;

  form!: UntypedFormGroup;
  isLoggedIn = false;
  isLogginFailled = false;
  errorMessage = '';
  roles: string[] = [];

  invalidLogin = false;
  loginModel: LoginRequest = new LoginRequest();
  CustomControler: any;
  isRequesting: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private notificationService: NotificationService
    // private readonly commonService: CommonService,
  ) {}

  ngOnInit() {
    this.creatSignInForm();
  }

  // get f() {
  //   return this.form.controls;
  // }

  creatSignInForm() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.form = this.formBuilder.group({
      email: [this.loginModel.email, [Validators.pattern(emailPattern)]],
      password: [this.loginModel.password, [Validators.required]],
      // resolved: [this.loginModel.resolved, [Validators.requiredTrue]],
    });
  }

  get email() {
    return this.form.get('email') as FormControl;
  }
  get password() {
    return this.form.get('password') as FormControl;
  }
  emailErrors() {
    return this.email.hasError('pattern')
      ? "Cet email n'est pas valide"
      : '';
  }
  onSubmit() {
    this.isRequesting = true;
    this.auth.signIn(this.loginModel).subscribe({
      next: (res: any) => {
        const userRoles = res.user.roles[0];
  
        // Stockage des informations dans le localStorage
        localStorage.setItem('userRoles', userRoles);
        localStorage.setItem('token', res.accessToken);
        const rolesName = res.user.roles.map((role: any) => role.name);
        const rolesId = res.user.roles.map((role: any) => role.id);
        localStorage.setItem('qsdfghjklmpoiuytreza', userRoles);
        const array1 = Math.floor(Math.random() * 999999999999999);
        const array2 = Math.floor(Math.random() * 999999999999999);
        localStorage.setItem('wxcvbnmlkjhgfdsqazertyuiop', array1 + rolesId + array2);
        localStorage.setItem('2wxcvbnmlkjhgfdsqazertyuiop', array1 + res.accessToken + array2);
        localStorage.setItem('response', res.status);
        this.isLoggedIn = true;
        localStorage.setItem('fuckYou', 'true');
        this.auth.setTokenInCookie('_YXV0aGVudGljYXRlZCI6dHJ1Z', res.accessToken, true);
  
        // Success message
        setTimeout(() => {
          if (res.user.email != null && userRoles == 'ROLE_ADMIN') {
            this.router.navigateByUrl('/');
            this.showSuccessMessage(res.user.displayName);
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
          if (res.user.email != null && (userRoles == 'ROLE_USER' || userRoles == 'ROLE_HEAD')) {
            this.router.navigateByUrl('/');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
            this.showSuccessMessage(res.user.displayName);
          }
          else {
            this.router.navigateByUrl('/preview');
          }
        }, 3100);
      }, 
      error: (err: any) => {
        setTimeout(() => {
          this.isRequesting = false;
          if (err && err.error && err.error.message) {
            if (err.error.message.toLowerCase().includes("disabled")) {
              this.notificationService.showErrorMessage("Vous devez confirmer votre messagerie avant de pouvoir vous connecter");
            } else {
              this.notificationService.showErrorMessage(err.error.message); 
            }
          } else {
            this.notificationService.showErrorMessage("Désolé, le service est temporairement hors ligne. Veuillez essayer plus tard.");
          }
          console.log(err);
        }, 1100);
      }
    });
  }
  

    /**
   * badCredentials : Message en cas d'identifiants incorrects
   * @return Nothing
   */
  badCredentials() {
    Swal.fire({
      icon: 'error',
      title: 'Oops... !',
      timer: 3000,
      text: 'Identifiants incorrects !',
    });
  }

  showSuccessMessage(username: string) {
    const Toast = Swal.mixin({
      toast: true,
      backdrop: false,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: `Content de vous revoir 🖐🏽 ${username}`,
      timer: 5000,
    });
  }

  showErorMessage(username?: string) {
    const Toast = Swal.mixin({
      toast: true,
      backdrop: false,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'error',
      title: `Identifiants incorrects ❌`,
      timer: 5000,
    });
  }

  /**
   * onClick - Show or hide password
   * @return Nothing
   */
  onClick() {
    if (this.showPassword === 'password') {
      this.showPassword = 'text';
      this.show = true;
    } else {
      this.showPassword = 'password';
      this.show = false;
    }
  }
}
