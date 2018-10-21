import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {

  isOpen = false;
  key: string;
  constructor(private router: Router) { }

  @HostListener('document:keydown', ['$event'])
  keyPressHandle(event: KeyboardEvent) {
    this.key = event.key;
    switch (this.key) {
      case '1':
        this.router.navigate(['/deal-type-selection']);
        break;
      case '2':
        this.router.navigate(['/search-deals']);
        break;
      case '3':
        this.router.navigate(['/single-search']);
        break;
      case '8':
        this.router.navigate(['/personal-settings']);
        break;
      case 'F12':
        event.preventDefault();
        break;

    }
  }


}
