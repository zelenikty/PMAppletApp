import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { map } from 'rxjs/operators';
/**
 * This service responsible to handle functionalities of In Out Delivery Deposit page
 * @export
 * @class InOutDeliveryDepositService
 */
@Injectable({
  providedIn: 'root'
})
export class InOutDeliveryDepositService {
  /**
   *Creates an instance of InOutDeliveryDepositService.
   * @param {DataService} dataService
   * @memberof InOutDeliveryDepositService
   */
  constructor(private dataService: DataService) { }

  /**
   * Retrieve In Out Delivery Deposit related data from the server
   * @returns
   * @memberof InOutDeliveryDepositService
   */
  getInOutDeliveryDepositData() {
    const fullUrl = `${apiUrl}inOutDeliveryDeposit.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
