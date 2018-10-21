import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { map } from 'rxjs/operators';
/**
 * This service responsible to handle functionalities of Delivery In Deposit page
 * @export
 * @class DeliveryInDepositService
 */
@Injectable({
  providedIn: 'root'
})
export class DeliveryInDepositService {
  /**
   *Creates an instance of DeliveryInDepositService.
   * @param {DataService} dataService
   * @memberof DeliveryInDepositService
   */
  constructor(private dataService: DataService) { }

  /**
   * Retrieve Delivery In Deposit related data from the server
   * @returns
   * @memberof DeliveryInDepositService
   */
  getDeliveryInDepositData() {
    const fullUrl = `${apiUrl}deliveryInDeposit.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
