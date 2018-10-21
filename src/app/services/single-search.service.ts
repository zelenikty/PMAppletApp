import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { map } from 'rxjs/operators';
/**
 * This service responsible to handle functionalities of Single Search page
 * @export
 * @class SingleSearchService
 */
@Injectable({
  providedIn: 'root'
})
export class SingleSearchService {
  /**
   *Creates an instance of SingleSearchService.
   * @param {DataService} dataService
   * @memberof SingleSearchService
   */
  constructor(private dataService: DataService) { }

  /**
   * Retrieve Single Search related data from the server
   * @returns
   * @memberof SingleSearchService
   */
  getSingleSearchData() {
    const fullUrl = `${apiUrl}singleSearch.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
