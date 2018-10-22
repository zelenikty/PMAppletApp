import {Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DatePickerComponent implements ControlValueAccessor {
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Input() defaultDate: any;
  @Input() placeholder = moment(this.defaultDate).format('DD.MM.YYYY') || 'Select';
  @Input() type: string;
  @Input() name: string;
  @Input() className: string;
  @Input() isDate: boolean;
  @Input() startAt: any = moment();
  _value: any;
  @Input()
  set value(value) {
    this._value = value;
  }
  get value() {
    return this._value;
  }
  @Input() isReadOnly = true;
  @Output() dateTimeChange = new EventEmitter();

  /**
  * value send to the parent component
  * @param {any} event object
  */
  getDate(event: any) {
    this.dateTimeChange.emit(this.value);
  }

  writeValue(obj: any): void {
    if (!obj) {
      this._value = this.defaultDate || null;
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

  onEnter(event) {
    const value = event.target.value;

    if (value === '') {
      this.value = moment().format('DD.MM.YYYY');
      return;
    }

    const parsedValue = value.split('.');
    if (parsedValue.length >= 3 && parsedValue[2].length === 1) {
      parsedValue[2] = `0${parsedValue[2]}`;
    }

    this.value = moment(parsedValue.join('.'), 'DD.MM.YYYY').format('DD.MM.YYYY');
  }
}
