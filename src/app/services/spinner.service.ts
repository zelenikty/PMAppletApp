import { Injectable } from '@angular/core';

/** Spinner show and hide service */
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  /**Display the spinner */
  static showPreLoader() {
    document.getElementById('preloader').style.display = 'block';
  }
  /** Hide the spinner  */
  static hidePreLoader() {
    document.getElementById('preloader').style.display = 'none';
  }
}
