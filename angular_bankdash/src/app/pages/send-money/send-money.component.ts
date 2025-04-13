import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgOtpInputComponent } from 'ng-otp-input';
import { SendMoneyOtpComponent, RightSectionCardsComponent } from '../../components';
import { StaticRoutes } from '../../core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-send-money',
  standalone: true,
  imports: [SharedModule, NgOtpInputModule, NgOtpInputComponent, ReactiveFormsModule, FormsModule, RightSectionCardsComponent],
  templateUrl: './send-money.component.html',
  styleUrl: './send-money.component.scss'
})
export class SendMoneyComponent implements OnInit {
  routes: StaticRoutes = new StaticRoutes;
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput!: NgOtpInputComponent;
  otpForm!: any;
  otpData: any;
  isLoading: boolean = false;
  config = {
    allowNumbersOnly: true,
    autoFocus: true,
    isPasswordInput: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  }
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.otpData = {
      otpCode: []
    }
  }

  onOtpChange(otpData: any) {
    console.log(this.otpData);
  }

  openSendMoneyDialog(): void {
    this.dialog.open(SendMoneyOtpComponent, {
      width: '640px',
      disableClose: false,
    });
    // Logique de transfert
  }

  validateSendingMoney(): boolean {
    if (this.otpData.otpCode.length == 6) {
      this.isLoading = true;
      return true;
    } else {
      this.isLoading = false;
      return false;
    }
  }

}
