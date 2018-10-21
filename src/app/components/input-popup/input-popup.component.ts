import { Component, OnInit, Input, Output, HostListener, EventEmitter, forwardRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../services/common.service';
import { SpinnerService } from '../../services/spinner.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputPopupComponent),
  multi: true
};
@Component({
  selector: 'app-input-popup',
  templateUrl: './input-popup.component.html',
  styleUrls: ['./input-popup.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class InputPopupComponent implements ControlValueAccessor {

  _placeholder: any = '';
  @Input()
  set placeholder(value) {
    this._placeholder = value && value === '' ? 'Add' : value;
  }
  get placeholder() {
    return this._placeholder;
  }
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Input() className: string;
  @Input() value: any;
  @Input() isReadonly = true;
  @Input() required = false;
  @Input() type = 'text';
  @Input() maxLength = 524288;
  @Input() padNumber;
  @Input() name: string;
  @Input() isErrorClass = false;
  @Input() isTextInputDisabled = false;
  @Output() add = new EventEmitter();
  @Output() selectItem = new EventEmitter();
  @Output() keyUp = new EventEmitter();
  @Output() blur = new EventEmitter();

  _lookupData: any;
  @Input()
  set lookupData(value) {
    this.setLookUpData(value);
  }
  get lookupData() {
    return this._lookupData;
  }

  codes = [];
  codesCache = [];
  activeCode = -1;
  selectedCode: any;
  model: NgbModalRef;

  constructor(private modalService: NgbModal, private commonService: CommonService) {
    commonService.resetInputPopupData.subscribe((res) => {
      this.value = '';
    });
  }

  /**
   * Handle Lookup popup model
   * @returns
   * @memberof InputPopupComponent
   */
  onAdd(content) {
    if (this.isReadonly) {
      return;
    }
    if (this.lookupData) {
      this.model = this.modalService.open(content, { centered: true });
    }
  }

  /**
  * value send to the parent component
  * @param {any} event object
  */
  onKey(event: any) {
    this.keyUp.emit(this.value);
  }

  onBlur(event) {
    this.blur.emit(event);
  }


  /**
  * Handle Code selection
  * @param index - Selected option
  */
  selectCode(idx) {
    this.activeCode = idx;
    this.selectedCode = this.codes[idx];
  }

  onSearch(searchTerm: string) {
    if (!this.codesCache || (searchTerm === '')) {
      this.codes = this.codesCache;
      return;
    }
    this.codes = [];
    this.codesCache.forEach((item) => {
      if (item['id'].indexOf(searchTerm) >= 0
        || item['name'].toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
        this.codes.push(item);
      }
    });
  }

  cancelSelection() {
    this.selectedCode = null;
    if (this.model) {
      this.model.close();
      this.model = null;
      this.onBlur(null);
    }
  }

  enterSelection() {
    SpinnerService.showPreLoader();
    setTimeout(() => {
      SpinnerService.hidePreLoader();
    }, 500);

    switch (this.type) {
      case 'text':
        this.value = this.selectedCode ? this.selectedCode.name : this.value;
        break;
      case 'number':
        this.value = this.selectedCode ? this.selectedCode.id : this.value;
        break;
    }

    if (this.model) {
      this.model.close();
      this.model = null;
    }

    this.add.emit(this.value);
    this.selectItem.emit(this.selectedCode);

  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event) {
    if (this.model) {
      switch (event.code) {
        case 'Enter':
          event.preventDefault();
          this.enterSelection();
          break;
        case 'Escape':
          event.preventDefault();
          this.cancelSelection();
          break;
      }
    }

  }

  writeValue(obj: any): void {
    if (!obj) {
      this.activeCode = null;
      this.selectedCode = null;
      this.value = null;
    }

  }
  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
  setDisabledState?(isDisabled: boolean): void {

  }


  private setLookUpData(value) {
    this._lookupData = value;
    this.codesCache = Object.assign([], this.lookupData);
    this.codes = Object.assign([], this.lookupData);
  }

}
