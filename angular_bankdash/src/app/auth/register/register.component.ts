import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../service/auth.service';
import { Routes as StaticRoutes } from '../../core/routes/routes';
import { GlobalConsts, NotificationService } from '../../core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  staticRoutes: StaticRoutes = new StaticRoutes();
  form!: FormGroup;
  submitted = false;
  globalConstants: GlobalConsts = new GlobalConsts();
  pageTitle = 'Inscription';
  isRequesting: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _formBuilder: UntypedFormBuilder,
    private readonly notificationService: NotificationService,
    private titleService: Title,

  ) {
    this.updateTitle(this.pageTitle);
  }

  ngOnInit() {
    this.form = this._formBuilder.group(
      {
        name: ['', Validators.required],
        displayName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        matchingPassword: ['', Validators.required],
        about: ['', Validators.required],
      },
      {
        validator: this.mustMatch('password', 'matchingPassword'),
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  get displayName() {
    return this.form.get('displayName') as FormControl;
  }

  get username() {
    return this.form.get('username') as FormControl;
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  get matchingPassword() {
    return this.form.get('matchingPassword') as FormControl;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.authService.signUp(this.form.value).subscribe({
      next: () => {
        console.log('Form Data:', this.form.value);
        setTimeout(() => {
          this.notificationService.showSuccessMessage(this.form.value.displayName);
          this.router.navigateByUrl('/auth/signin');
        }, 900);
        this.onReset();
      },
      error: (error) => {
        console.log(error);
      },
    });
    console.log('Form Data:', this.form.value);
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  /**
   * Check if two password match
   * @param password first password
   * @param matchingPassword repeted password
   */
  mustMatch(password: string, matchingPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[matchingPassword];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  /**
   * Updates the title of the page
   * @param {string} courseId : Title of course
   * @returns {void}
   */
  updateTitle(pageTitle?: String): void {
    const currentTitle = `${this.globalConstants?.quanPay} - ${pageTitle}`;
    this.titleService.setTitle(currentTitle);
  }
}
