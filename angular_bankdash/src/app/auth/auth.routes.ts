import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'signin', component: SigninComponent, title: 'BankDash | Connexion'
      },
      {
        path: 'register', component: RegisterComponent, title: 'BankDash | Inscription'
      },
    ],
  }
];
