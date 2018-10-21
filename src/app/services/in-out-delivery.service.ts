import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { map } from 'rxjs/operators';
/**
 *  This service responsible to handle functionalities of In Out Delivery page
 * @export
 * @class InOutDeliveryService
 */
@Injectable({
  providedIn: 'root'
})
export class InOutDeliveryService {
  /**
   *Creates an instance of InOutDeliveryService.
   * @param {DataService} dataService
   * @memberof InOutDeliveryService
   */
  constructor(private dataService: DataService) { }

  /**
   * Retrieve In Out Delivery related data from the server
   * @returns
   * @memberof InOutDeliveryService
   */
  getInOutDeliveryData() {
    const fullUrl = `${apiUrl}inOutDelivery.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
