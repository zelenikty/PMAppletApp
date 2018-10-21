import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * This service responsible to handle functionalities of Spot Unallocated page
 * @export
 * @class SpotUnallocatedService
 */
@Injectable({
  providedIn: 'root'
})
export class SpotUnallocatedService {

  outPutControl = new Subject();
  capturePanel = new Subject();
  contactData = new Subject();

  /**
   *Creates an instance of SpotUnallocatedService.
   * @param {DataService} dataService
   * @memberof SpotUnallocatedService
   */
  constructor(private dataService: DataService) { }

  /**
   *  Retrieve Spot Unallocated related data from server
   * @returns
   * @memberof SpotUnallocatedService
   */
  getSpotUnallocatedData() {
    const fullUrl = `${apiUrl}spotUnallocated.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }

  /**
   * Retrieve Spot Unallocated Output Control related data from server
   * @returns
   * @memberof SpotUnallocatedService
   */
  getSpotUnallocatedCaptureData() {
    const fullUrl = `${apiUrl}spotUnallocatedCapture.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }

  /**
   * publish event to subscribers
   * @param {*} value
   * @memberof SpotUnallocatedService
   */
  setOutPutControlData(value) {
    this.outPutControl.next(value);
  }

  /**
   * publish event to subscribers
   * @param {*} value
   * @memberof SpotUnallocatedService
   */
  setContactData(value) {
    this.contactData.next(value);
  }

  /**
   * publish event to subscribers
   * @param {*} value
   * @memberof SpotUnallocatedService
   */
  setCapturePanelData(value) {
    this.capturePanel.next(value);
  }

  /**
   * Save Spot Unallocated data
   * @param {*} data
   * @returns
   * @memberof SpotUnallocatedService
   */
  saveSpotUnallocatedData(data) {
    const fullUrl = `${apiUrl}spotUnallocated.json`;
    return this.dataService.saveData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
