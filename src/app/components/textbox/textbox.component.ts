import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {

  @Input() placeholder = '';
  @Input() type: string;
  _name: string;
  @Input()
  set name(name: string) {
    this._name = name ? name : '';
  }
  get name() {
    return this._name;
  }
  @Input() className: string;
  @Input() isSearch: boolean;
  @Input() value: any;
  @Output() keyUp = new EventEmitter();

  ngOnInit() {
    this.value = this.value || '';
  }

  /**
  * value send to the parent component
  * @param {any} event object
  */
  onKey(value) {
    this.value = value;
    this.keyUp.emit(this.value);
  }

}
