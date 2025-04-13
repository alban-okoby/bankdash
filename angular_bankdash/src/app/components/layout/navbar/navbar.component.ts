import { Component } from '@angular/core';
import { AuthService } from '../../../auth/service/auth.service';
import { UsersService } from '../../../core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  currentUser: any;
  isLogged: boolean = false;
  isUser: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {
    this.userService.currentUser().subscribe((user: any) => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
    const token = this.authService.getCookie('YXV0aGVudGljYXRlZCI6dHJ1Z');
  }

  // Logout
  logout() {
    Swal.fire({
      title: "Vous êtes sur le point de quitter l'application 😦",
      showDenyButton: true,
      showCloseButton: true,
      confirmButtonText: "Non, rester",
      denyButtonText: `Oui me déconnecter`
    }).then((result) => {
      if (result.isConfirmed) {
      } else if (result.isDenied) {
        this.authService.logout();
      }
    });
    
  }
}
