import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog-box',
  templateUrl: './confirmation-dialog-box.component.html',
  styleUrls: ['./confirmation-dialog-box.component.scss']
})
export class ConfirmationDialogBoxComponent {
  @Input() dialogType = '';
  @Output() confirmation = new EventEmitter();

  cancel() {
    this.confirmation.emit(false);
  }

  confirm() {
    this.confirmation.emit(true);
  }

  @HostListener('window:keyup', ['$event'])
  private onKeyUp(event) {
    switch (event.code) {
      case 'KeyY':
        this.confirm();
        break;
      case 'KeyN':
        this.cancel();
        break;
    }
  }
}
