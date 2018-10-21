import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, forwardRef, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};

/** Custom check box  */
@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CheckboxComponent implements ControlValueAccessor {


  @Input() label: string;
  @Input() isChecked = false;
  @Input() disabled = false;
  @Output() getChange = new EventEmitter();
  @Input() className: string;
  isFocused: boolean;
  key: string;


  // get accessor
  get value(): any {
    return this.isChecked;
  }

  // set accessor including call the onchange callback
  set value(value: any) {
    this.isChecked = value;
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @HostListener('focus')
  focusHandler() {
    this.isFocused = true;
  }

  @HostListener('focusout')
  focusOutHandler() {
    this.isFocused = false;
  }

  @HostListener('document:keydown', ['$event'])
  keyPressHandle(event: KeyboardEvent) {

    if (this.isFocused) {
      this.key = event.code;
      switch (this.key) {
        case 'Space':
          this.value = !this.value;
          this.isChecked = this.value;
          this.getChange.emit(this.isChecked);
          this.onChangeCallback(this.value);
          break;
      }
    }

  }

  writeValue(value: any): void {
    if (value !== this.isChecked) {
      this.isChecked = value;
    }
  }

  onChange(isChecked) {
    this.value = isChecked;
    this.getChange.emit(this.isChecked);
    this.onChangeCallback(this.value);
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
