import { Component } from '@angular/core';
import { DashMainComponent } from '../../components/dash-main/dash-main.component';
import { SharedModule } from '../../shared/shared.module';
import { StaticRoutes } from '../../core';
@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [DashMainComponent, SharedModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.scss'
})
export class DashbordComponent {
  routes: StaticRoutes = new StaticRoutes();

}
