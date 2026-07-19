import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
 private popup = Swal.mixin({
    customClass: {
      popup: 'custom-popup',
      confirmButton: 'custom-btn'
    },
    buttonsStyling: false
  });

 success(message: string) {
  Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: message,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false
  });
}

  error(message: string) {
  Swal.fire({
    icon: 'error',
    title: 'Oops!',
    text: message,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false
  });
}
}
