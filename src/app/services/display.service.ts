import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { map } from 'rxjs/operators';
/**
 * This service responsible to handle functionalities of Display page
 * @export
 * @class DisplayService
 */
@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  /**
   *Creates an instance of DisplayService.
   * @param {DataService} dataService
   * @memberof DisplayService
   */
  constructor(private dataService: DataService) { }

  /**
   * Retrieve Display related data from the server
   * @returns
   * @memberof DisplayService
   */
  getDisplayData() {
    const fullUrl = `${apiUrl}display.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
