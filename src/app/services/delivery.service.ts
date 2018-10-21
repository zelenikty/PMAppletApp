import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { map } from 'rxjs/operators';
/**
 * This service responsible to handle functionalities of Delivery page
 * @export
 * @class DeliveryService
 */
@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  /**
   * Creates an instance of DeliveryService.
   * @param {DataService} dataService
   * @memberof DeliveryService
   */
  constructor(private dataService: DataService) { }
  /**
   * Retrieve Delivery related data from the server
   * @returns
   * @memberof DeliveryService
   */
  getDeliveryData() {
    const fullUrl = `${apiUrl}delivery.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
