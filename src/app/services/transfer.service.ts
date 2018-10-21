import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { map } from 'rxjs/operators';
/**
 * This service responsible to handle functionalities of TransferS page of Unallocated
 * @export
 * @class TransferService
 */
@Injectable({
  providedIn: 'root'
})
export class TransferService {
  /**
   *Creates an instance of TransferService.
   * @param {DataService} dataService
   * @memberof TransferService
   */
  constructor(private dataService: DataService) { }

  /**
   * Retrieve Transfer related data from the server
   * @returns
   * @memberof TransferService
   */
  getTransferData() {
    const fullUrl = `${apiUrl}transfer.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
