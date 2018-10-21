import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { map } from 'rxjs/operators';
/**
 * This service responsible to handle functionalities of DealList page
 * @export
 * @class DealListService
 */
@Injectable({
  providedIn: 'root'
})
export class DealListService {
  /**
   *Creates an instance of DealListService.
   * @param {DataService} dataService
   * @memberof DealListService
   */
  constructor(private dataService: DataService) { }

  /**
   * Retrieve DealList related data from the server
   * @returns
   * @memberof DealListService
   */
  getDealListData() {
    const fullUrl = `${apiUrl}dealList.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
