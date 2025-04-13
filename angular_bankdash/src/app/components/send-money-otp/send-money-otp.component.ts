import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { CountDownComponent } from "../count-down/count-down.component";

@Component({
  selector: 'app-send-money-otp',
  standalone: true,
  imports: [NgOtpInputModule, NgOtpInputComponent, ReactiveFormsModule, FormsModule, CountDownComponent],
  templateUrl: './send-money-otp.component.html',
  styleUrl: './send-money-otp.component.scss'
})
export class SendMoneyOtpComponent implements OnInit {
   @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput!: NgOtpInputComponent;
    otpForm!: any;
    otpData: any;
    canSent: boolean = false;
    config = {
      allowNumbersOnly: true,
      autoFocus: true,
      length: 6,
      isPasswordInput: false,
      placeholder: '',
      inputStyles: {},
    }
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.setResponsiveInputStyles(event.target.innerWidth);
    }

    setResponsiveInputStyles(width: number) {
      const isMobile = width < 600;
      this.config.inputStyles = {
        width: isMobile ? '35px' : '50px',
        height: isMobile ? '35px': '50px',
        backgroundColor: '#F6F7F8',
        color: '#333',
      };
    }

    ngOnInit() {
      this.otpData = {
        code: this.ngOtpInput
      }
    }

    validateSendingMoney() {
      console.log(this.otpData);
    }

    onOtpChange(event: any): boolean {
      this.otpData.code = event;
      if (this.otpData.code.length == 6) {
        this.canSent = true;
        console.log(this.otpData);
        return true;
      } else {
        this.canSent = false;
        return false;
      }
    }
}
