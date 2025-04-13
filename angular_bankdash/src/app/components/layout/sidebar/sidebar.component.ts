import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';
import { Routes } from '../../../core/routes/routes';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  routes: Routes = new Routes();
  constructor(private authService: AuthService) { }

  // Logout
  logout() {
    this.authService.logout();
  }
}
