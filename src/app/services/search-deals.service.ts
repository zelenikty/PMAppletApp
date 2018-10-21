import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { map } from 'rxjs/operators';
/**
 * This service responsible to handle functionalities of Search Deals page
 * @export
 * @class SearchDealsService
 */
@Injectable({
  providedIn: 'root'
})
export class SearchDealsService {
  /**
   *Creates an instance of SearchDealsService.
   * @param {DataService} dataService
   * @memberof SearchDealsService
   */
  constructor(private dataService: DataService) { }

  /**
   * Retrieve Search Deals related data from the server
   * @returns
   * @memberof SearchDealsService
   */
  getSearchDealsData() {
    const fullUrl = `${apiUrl}searchDeals.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
