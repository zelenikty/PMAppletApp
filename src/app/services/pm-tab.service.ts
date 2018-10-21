import { Injectable, Output, EventEmitter } from '@angular/core';

/**
 * Common tab selection service
 */
@Injectable({
  providedIn: 'root'
})
export class PmTabService {

  @Output() tabSelectionChanged: EventEmitter<any> = new EventEmitter();

  tabSelectionChange(index) {
    this.tabSelectionChanged.emit(index);
  }

}
