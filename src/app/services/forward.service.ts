import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { map } from 'rxjs/operators';
/**
 * This service responsible to handle functionalities of Forward page of Unallocated
 * @export
 * @class ForwardService
 */
@Injectable({
  providedIn: 'root'
})
export class ForwardService {
  /**
   * Creates an instance of ForwardService.
   * @param {DataService} dataService
   * @memberof ForwardService
   */
  constructor(private dataService: DataService) { }

  /**
   * Retrieve Forward related data from the server
   * @returns
   * @memberof ForwardService
   */
  getForwardData() {
    const fullUrl = `${apiUrl}forward.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
