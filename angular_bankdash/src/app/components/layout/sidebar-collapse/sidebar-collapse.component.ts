import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-collapse',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-collapse.component.html',
  styleUrl: './sidebar-collapse.component.scss'
})
export class SidebarCollapseComponent {
  @Input() headerTitle: string = 'Tableau de bord'; 

}
