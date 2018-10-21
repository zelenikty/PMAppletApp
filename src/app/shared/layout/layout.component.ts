import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  @Input() isDisplayFooter = true;
  isOpen: boolean;
  key: string;
  constructor(private router: Router) { }

  displayContextMenu() {
    this.isOpen = !this.isOpen;
  }

  /***
  * Shortcut key functions
  */
  @HostListener('document:keydown', ['$event'])
  keyPressHandle(event: KeyboardEvent) {
    this.key = event.key;
    switch (this.key) {
      case 'F1':
        event.preventDefault();
        this.openJavaConsole();
        break;
      case 'F3':
        event.preventDefault();
        break;
    }
  }

  /*** Open java console */
  openJavaConsole(): any {
    this.router.navigate(['/java-console']);
  }

}
