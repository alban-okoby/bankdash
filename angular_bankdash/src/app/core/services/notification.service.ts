import { Injectable } from '@angular/core';
import Swal, { SweetAlertPosition } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // Audio notification
sendNotificationAudio: HTMLAudioElement = new Audio();
errorNotificationAudio: HTMLAudioElement = new Audio();
deleteNotificationAudio: HTMLAudioElement = new Audio();
newNotificationAudio: HTMLAudioElement = new Audio();
statusNotification: boolean = true;

  constructor() {
    this.sendNotificationAudio.src = 'assets/audio/sendnotification.mp3';
    this.errorNotificationAudio.src = 'assets/audio/error_notification.mp3';
    this.deleteNotificationAudio.src = 'assets/audio/deletenotification.wav';
    this.newNotificationAudio.src = 'assets/audio/getnotification.mp3';
  }
  /**
   * Acive or unactive notification song
  */
  toogleNotificationAudio() {
    this.statusNotification = !this.statusNotification;
  }
  playSendNotificationAudio() {
    if (this.statusNotification == true) {
      this.sendNotificationAudio.play();
    }
  }
  playErrorNotificationAudio() {
    if (this.statusNotification == true) {
      this.errorNotificationAudio.play();
    }
  }
  playDeleteNotificationAudio() {
    if (this.statusNotification == true) {
      this.deleteNotificationAudio.play();
    }
  }

  /**
   * Show error message
   * @param error : error message
   */
  showErrorMessage(error?: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      backdrop: false,
      timer: 5000,
      timerProgressBar: false,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'error',
      title: ` ${error != null || error != undefined ? error : ''}`,
    });

  }

  /**
   * Show success message
   * @param : value
   */
  showSuccessMessage(value?: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      backdrop: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: `Succès ${value != null || value != undefined ? value : ''}`,
    });
  }
}
