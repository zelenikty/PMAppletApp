import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  @Input() placeholder = this.defaultDate || 'Select';
  @Input() type: string;
  @Input() name: string;
  @Input() className: string;
  @Input() isDate: boolean;
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

}
