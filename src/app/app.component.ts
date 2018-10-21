import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  /**
  * Listening to keyboard key up events
  * @param {*} event
  * @memberof AppComponent
  */
  @HostListener('window:keydown', ['$event'])
  onKeyUp(event) {
    this.setupKeyPressEvents(event);
  }

  /**
   * Listening to key press events
   * @private
   * @param {*} event
   * @memberof SpotUnallocatedComponent
   */
  private setupKeyPressEvents(event) {
    if (event.shiftKey && event.ctrlKey && event.code === 'F5') {
      event.preventDefault();
      this.clearCacheData();
      return;
    }
  }

  /**
   * Clear cache data
   * @private
   * @memberof SpotUnallocatedComponent
   */
  private clearCacheData() {
    sessionStorage.removeItem('lookupData');
    sessionStorage.removeItem('spotUnallocatedCaptureData');
  }
}
