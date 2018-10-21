import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { apiUrl } from '../app-configs/configs';
import { map } from 'rxjs/operators';
/**
 * This service responsible to handle functionalities of Vault Transfer page
 * @export
 * @class VaultTransferService
 */
@Injectable({
  providedIn: 'root'
})
export class VaultTransferService {
  /**
   *Creates an instance of VaultTransferService.
   * @param {DataService} dataService
   * @memberof VaultTransferService
   */
  constructor(private dataService: DataService) { }

  /**
   * Retrieve Vault Transfer related data from the server
   * @returns
   * @memberof VaultTransferService
   */
  getVaultTransferData() {
    const fullUrl = `${apiUrl}vaultTransfer.json`;
    return this.dataService.getData(fullUrl).pipe(
      map((res) => res[0].request)
    );
  }
}
