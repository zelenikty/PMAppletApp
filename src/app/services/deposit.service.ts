import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { map } from 'rxjs/operators';
/**
 * This service responsible to handle functionalities of Deposit page
 * @export
 * @class DepositService
 */
@Injectable({
  providedIn: 'root'
})
export class DepositService {
  /**
   * Creates an instance of DepositService.
   * @param {DataService} dataService
   * @memberof DepositService
   */
  constructor(private dataService: DataService) { }

  /**
   * Retrieve Diposit related data from the server
   * @returns
   * @memberof DepositService
   */
  getDipositData() {
    const fullUrl = `${apiUrl}deposit.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
