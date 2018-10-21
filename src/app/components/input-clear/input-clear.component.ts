import { Component, OnInit, Input, EventEmitter, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputClearComponent),
  multi: true
};

@Component({
  selector: 'app-input-clear',
  templateUrl: './input-clear.component.html',
  styleUrls: ['./input-clear.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputClearComponent implements ControlValueAccessor {


  @Input() placeholder = '';
  @Input() className: string;
  @Input() value: any;
  @Input() isReadonly = true;
  @Input() required = false;
  @Input() type = 'text';
  @Input() maxLength = 524288;
  @Input() padNumber;
  @Input() name: string;
  @Input() isErrorClass = false;
  @Output() keyUp = new EventEmitter();
  @Input() isValid = true;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  /**
  * value send to the parent component
  * @param {any} event object
  */
  onKey(event: any) {
    if (this.value) {
      this.writeValue(this.value);
      this.onChangeCallback(this.value);
      this.keyUp.emit(this.value);
      this.isValid = true;
    } else {
      this.onChangeCallback(null);
      this.isValid = false;
      this.writeValue(null);
    }

  }

  onClear() {
    this.value = null;
    this.onChangeCallback(null);
    this.isValid = true;
  }

  writeValue(obj: any): void {
    if (!obj) {
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
}
