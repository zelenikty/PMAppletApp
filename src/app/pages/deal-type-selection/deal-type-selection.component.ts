import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

// this is the second page of main menu
@Component({
  selector: 'app-deal-type-selection',
  templateUrl: './deal-type-selection.component.html',
  styleUrls: ['./deal-type-selection.component.scss']
})
export class DealTypeSelectionComponent {
  key: string;

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/main-menu']);
  }


  // Shortcut key press
  @HostListener('document:keydown', ['$event'])
  keyPressHandle(event: KeyboardEvent) {
    event.preventDefault();
    this.key = event.key;
    switch (this.key) {
      case '1':
        this.router.navigate(['/deal-type-selection/spot-unallocated']);
        break;
      case '2':
        this.router.navigate(['/deal-type-selection/spot-unallocated']);
        break;
      case '3':
        this.router.navigate(['/deal-type-selection/spot-unallocated']);
        break;
      case '5':
        this.router.navigate(['/deal-type-selection/spot-unallocated']);
        break;
      case '7':
        this.router.navigate(['/deal-type-selection/spot-unallocated']);
        break;
      case '8':
        this.router.navigate(['/deal-type-selection/spot-unallocated']);
        break;
      case '9':
        this.router.navigate(['/deal-type-selection/spot-unallocated']);
        break;
      case 'F12':
        this.router.navigate(['/main-menu']);
        break;

      default:
        break;
    }
  }

}
