import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { SendMoneyComponent } from '../send-money/send-money.component';
import { SendMoneyOtpComponent } from '../../components/send-money-otp/send-money-otp.component';
import { StaticRoutes } from '../../core';
import { RightSectionCardsComponent } from '../../components';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [SharedModule, RightSectionCardsComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  routes: StaticRoutes = new StaticRoutes();
  constructor(
    public dialog: MatDialog
  ) { }

}
