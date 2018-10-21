import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.scss']
})

/***
 * Popup menu used in header and main menus
 */
export class PopupMenuComponent {

  @Input() isOpen: boolean;
  constructor() { }

}
