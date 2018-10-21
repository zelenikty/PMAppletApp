import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { map } from 'rxjs/operators';
/**
 * This service responsible to handle functionalities of Spot Consignment page
 * @export
 * @class SpotConsignmentService
 */
@Injectable({
  providedIn: 'root'
})
export class SpotConsignmentService {
  /**
   *Creates an instance of SpotConsignmentService.
   * @param {DataService} dataService
   * @memberof SpotConsignmentService
   */
  constructor(private dataService: DataService) { }

  /**
   * Retrieve Spot Consignment related data from the server
   * @returns
   * @memberof SpotConsignmentService
   */
  getSpotConsignmentData() {
    const fullUrl = `${apiUrl}deposit.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
