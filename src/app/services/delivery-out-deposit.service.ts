import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { map } from 'rxjs/operators';
/**
 * This service responsible to handle functionalities of Delivery Out Deposit page
 * @export
 * @class DeliveryOutDepositService
 */
@Injectable({
  providedIn: 'root'
})
export class DeliveryOutDepositService {
  /**
   *Creates an instance of DeliveryOutDepositService.
   * @param {DataService} dataService
   * @memberof DeliveryOutDepositService
   */
  constructor(private dataService: DataService) { }

  /**
   * Retrieve Delivery Out Deposit related data from the server
   * @returns
   * @memberof DeliveryOutDepositService
   */
  getDeliveryOutDepositData() {
    const fullUrl = `${apiUrl}deliveryOutDeposit.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
