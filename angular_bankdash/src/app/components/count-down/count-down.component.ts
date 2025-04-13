import { Component, Input, input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-down',
  standalone: true,
  imports: [],
  templateUrl: './count-down.component.html',
  styleUrl: './count-down.component.scss'
})
export class CountDownComponent implements OnInit, OnDestroy {
  @Input() timeLeft: number = 30;
  private intervalId: any;
  public displayTime: string = '';

  constructor() {
    const storedTime = localStorage.getItem('countdown-time');
    if (storedTime) {
      this.timeLeft = parseInt(storedTime, 10);
    }

    this.updateDisplayTime();
    this.startCountdown();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  /**
   * Starts the countdown. Decreases the timeLeft by one every second
   * and updates the display time. If the timeLeft reaches 0, the
   * interval is cleared and the 'countdown-time' is removed from
   * local storage.
   */
  private startCountdown(): void {
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        localStorage.setItem('countdown-time', this.timeLeft.toString());
      } else {
        clearInterval(this.intervalId);
      }
      if (this.timeLeft === 0){
        localStorage.removeItem('countdown-time');
      }
      this.updateDisplayTime();
    }, 1000);
  }

  /**
   * Updates the display time variable to show the correct time left
   * in the countdown. The time is formatted as mm:ss
   */
  private updateDisplayTime(): void {
    const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
    const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
    this.displayTime = `${minutes}:${seconds}`;
  }
}
