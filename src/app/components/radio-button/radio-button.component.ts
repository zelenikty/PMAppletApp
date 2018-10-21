import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {

  @Input() label: string;
  @Input() isChecked: boolean;
  @Input() value: string;
  @Output() getChange = new EventEmitter();
  @Input() className: string;
  @Input() groupName: string;

  change(value) {
    this.isChecked = value;
    this.getChange.emit(this.isChecked);
  }


}
