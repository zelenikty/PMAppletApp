import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-repetition',
  templateUrl: './repetition.component.html',
  styleUrls: ['./repetition.component.scss']
})
export class RepetitionComponent {
  @Input() isReadOnly = true;
  _lookupData: any;
  @Input()
  set lookupData(value) {
    this.setupLookupData(value);
  }
  get lookupData() {
    return this._lookupData;
  }

  oversteerTypes = [];

  constructor() { }

  /**
   * Setup lookup data
   * @private
   * @param {*} value
   * @memberof RepetitionComponent
   */
  private setupLookupData(value) {
    this._lookupData = value;
    if (this._lookupData) {
      this.oversteerTypes = this.lookupData.confirmationTypes ? this.lookupData.oversteerTypes.map(q => q.value) : [];
    }
  }

}
