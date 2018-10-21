import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ValidationErrorsWarnings } from '../models/validationErrorsWarnings';
import { AppError } from '../models/appError';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  check = new Subject();
  save = new Subject();
  reset = new Subject();
  resetInputPopupData = new Subject();
  validationErrors = new Subject();
  resetCapturePanelData = new Subject();
  resetValidationErrorsAndWarningsData = new Subject();
  errorHandling = new Subject();

  /**
   * publish event to subscribers
   * @param {*} value
   * @memberof CommonService
   */
  setCheck(value) {
    this.check.next(value);
  }

  /**
   * publish event to subscribers
   * @param {*} value
   * @memberof CommonService
   */
  setSave(value) {
    this.save.next(value);
  }

  /**
   * publish event to subscribers
   * @param {*} value
   * @memberof CommonService
   */
  setReset(value) {
    this.reset.next(value);
  }

  setResetInputPopuData(value) {
    this.resetInputPopupData.next(value);
  }

  setValidationErrors(value: ValidationErrorsWarnings) {
    this.validationErrors.next(value);
  }

  resetCapturePanel() {
    this.resetCapturePanelData.next();
  }

  resetValidationErrorsAndWarnings() {
    this.resetValidationErrorsAndWarningsData.next();
  }

  setError(value: AppError) {
    this.errorHandling.next(value);
  }

  resetError() {
    this.errorHandling.next(null);
  }
}
