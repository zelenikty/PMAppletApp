import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-output-control',
  templateUrl: './output-control.component.html',
  styleUrls: ['./output-control.component.scss']
})
export class OutputControlComponent  {
  @Input() isReadOnly = true;
  _lookupData: any;
  @Input()
  set lookupData(value) {
    this.setupLookupData(value);
  }
  get lookupData() {
    return this._lookupData;
  }

  _outputControlData: any;
  @Input()
  set outputControlData(value) {
    this.setupOutputControlData(value);
  }
  get outputControlData() {
    return this._outputControlData;
  }

  confirmationTypes = [];
  paymentTypes = [];
  isSurpressConfirm = false;
  outputCData = { confirmTo: '', confirmDes: '' };
  constructor() { }

  onSurpressConfirm(value: boolean) {
    this.isSurpressConfirm = value;
    if (value) {
      Object.assign(this.outputCData, this.outputControlData);
    } else {
      this.outputCData = { confirmTo: '', confirmDes: '' };
    }
  }

  /**
   * Setup lookup data
   * @private
   * @param {*} value
   * @memberof OutputControlComponent
   */
  private setupLookupData(value) {
    this._lookupData = value;
    if (this._lookupData) {
      this.confirmationTypes = this.lookupData.confirmationTypes ? this.lookupData.confirmationTypes.map(q => q.value) : [];
      this.paymentTypes = this.lookupData.paymentTypes ? this.lookupData.paymentTypes.map(q => q.value) : [];
    }
  }

  private setupOutputControlData(value) {
    this._outputControlData = value;
  }
}
