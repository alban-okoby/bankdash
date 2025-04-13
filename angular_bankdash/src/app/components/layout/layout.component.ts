import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarCollapseComponent } from "./sidebar-collapse/sidebar-collapse.component";
import { DashMainComponent } from '../dash-main/dash-main.component';
import { DashbordComponent } from "../../pages/dashbord/dashbord.component";
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, SidebarCollapseComponent, DashMainComponent, DashbordComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  currentTitle: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          return child?.snapshot.data['title'] || '';
        })
      )
      .subscribe((title: string) => {
        this.currentTitle = title;
      });
  }
}
